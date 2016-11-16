if (!Promise || !('all' in Promise) || !(typeof Promise.all === 'function')) {
  throw new Error('Promise is undefined. You may want to include a polyfill.');
}

export default class ThrottledPromise {
  /**
   * Creates a new Throttled Promise.
   * @param {Function} callback - The function to execute.
   */
  constructor(callback) {
    if (typeof callback !== 'function') {
      throw new Error('ThrottledPromise only accepts a function.');
    }

    this.callback = callback;
  }

  /**
   * Run the ThrottledPromise.
   * @return {Promise}
   */
  run() {
    return new Promise(this.callback);
  }

  /**
   * Run all `promises` in parallel, limited to `threads`.
   * @param {Array} promises - An array of `ThrottledPromise`s.
   * @param {Number} threads - The max amount of threads to be executed in parallel.
   * @return {Promise}
   */
  static all(promises, threads = Infinity) {
    if (!Array.isArray(promises)) {
      throw new Error('promises must be an array.');
    }
    if (!Number.isInteger(threads)) {
      throw new Error('threads must be an integer.');
    }

    if (promises.length === 0) {
      return Promise.resolve([]);
    }

    const promisesCount = promises.length;
    const resolveValues = [];

    let promisesCompleted = 0;

    /**
     * Starts next Promise.
     * @param {Function} resolve - The function to execute after a Promise resolves.
     * @param {Function} reject - The function to execute after a Promise rejects.
     * @return {Promise}
     */
    const next = (resolve, reject) => {
      const index = promisesCount - promises.length;
      const tp = promises.shift();

      if (!(tp instanceof ThrottledPromise)) {
        resolveValues[index] = tp;
        promisesCompleted++;

        finishPromise(resolve, reject);
      }

      return tp.run().then((resolveValue) => {
        resolveValues[index] = resolveValue;
        promisesCompleted++;

        finishPromise(resolve, reject);
      })
      .catch(reject);
    };

    /**
     * Finish a Promise and continue the queue.
     * @param {Function} resolve - The function to execute after a Promise resolves.
     * @param {Function} reject - The function to execute after a Promise rejects.
     */
    const finishPromise = (resolve, reject) => {
        if (promises.length > 0) {
          next(resolve, reject);
        } else if (promisesCompleted === promisesCount) {
          resolve();
        }
    };

    return new Promise((resolve, reject) => {
      const threadsCount = Math.min(promisesCount, threads);

      for (let i = 0; i < threadsCount; i++) {
        next(resolve, reject);
      }
    }).then(() => resolveValues);
  }
}
