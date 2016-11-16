const ThrottledPromise = require('../../');
const timeoutDelay = 1000;

function createResolving() {
    return new ThrottledPromise((resolve, reject) => {
        setTimeout(resolve, timeoutDelay);
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
