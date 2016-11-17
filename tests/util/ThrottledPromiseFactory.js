const ThrottledPromise = require('../../');
const timeoutDelay = 100;

function createResolving(returnValue = undefined) {
    return new ThrottledPromise((resolve, reject) => {
        const next = () => resolve(returnValue);
        setTimeout(next, timeoutDelay);
    });
}

function createRejecting() {
    return new ThrottledPromise((resolve, reject) => {
        setTimeout(reject, timeoutDelay);
    });
}

module.exports = {
  createResolving,
  createRejecting,
};
