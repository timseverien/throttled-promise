if(!!Promise) {
    /**
     * Wrapper Object so ThrottledPromise.all() can decide when to run the Promise
     * @param {Function} promise
     * @constructor
     */
    function ThrottledPromise(promise) {
        this.index = -1;
        this.promise = promise;
    }

    /**
     * Fires the promise
     * @returns {Promise}
     */
    ThrottledPromise.prototype.run = function() {
        return new Promise(this.promise);
    };

    /**
     * Run ThrottledPromises semi-parallel
     * @param {Array} promises
     * @param {Number} threads
     */
    ThrottledPromise.all = function(promises, threads) {
        promises = promises.map(function(tp, i) {
            if(!(tp instanceof ThrottledPromise)) {
                throw 'ThrottledPromise.all() only accepts a list of ThrottledPromises.';
            }

            // Store index in ThrottledPromise
            tp.index = i;
            return tp;
        });

        var completed = 0,
            count = promises.length,
            values = [];

        // A function to iterate through promises
        function next(next, resolve, reject) {
            var tp = promises.shift(),
                p = tp.run();

            p.then(function(value) {
                values[tp.index] = value;

                // Not everything is completed, so move on to next
                if(++completed < count) next(next, resolve, reject);

                // Everytimg seems completed, Promise will handle the rest
                else resolve(values);
            }).catch(reject);
        }

        return new Promise(function(resolve, reject) {
            var i = Math.min(threads, promises.length);
            while(i--) next(next, resolve, reject);
        });
    };
} else throw 'Promise is not defined.';

// Export for node.js/io.js
if(typeof module.exports !== 'undefined') {
    module.exports = ThrottledPromise;
}