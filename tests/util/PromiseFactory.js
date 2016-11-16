const ThrottledPromise = require('../../');
const timeoutDelay = 1000;

function getThrottledResolvedPromise() {
    return new ThrottledPromise((resolve, reject) => {
        setTimeout(resolve, timeoutDelay);
    });
}

function getThrottledRejectedPromise() {
    return new ThrottledPromise((resolve, reject) => {
        setTimeout(reject, timeoutDelay);
    });
}

module.exports = {
  getThrottledResolvedPromise,
  getThrottledRejectedPromise,
};
