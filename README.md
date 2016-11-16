ThrottledPromise
================

Promises are great, but the API only lets us run things in parallel or sequence. But sometimes, you don’t want to run *all* processes in parallel. To keep CPU/network/memory usage to a minimum for example. In that case, you may want to throttle the amount of parallel processes. This is what ThrottledPromise is for.

## Installation

```shell
npm install throttled-promise
```

or

```shell
bower install throttled-promise
```

## Usage

```js
const ThrottledPromise = require('throttled-promise');
const promises = [
    new ThrottledPromise((resolve, reject) => ...),
    new ThrottledPromise((resolve, reject) => ...),
    new ThrottledPromise((resolve, reject) => ...)
];

// Run promises, but only 2 parallel
ThrottledPromise.all(promises, 2)
.then(...)
.catch(...);
```

`ThrottlePromise` is not a substitution for `Promise`. It does not have the `.then()` and `.catch()` methods. It’s only meant to use for `ThrottledPromise.all()`. However, `ThrottledPromise.all()` does return a Promise object and can be chained as seen in the example above.

## Note

Some environments, older browsers for example, do not support Promises. To use this module on those environments, you will need a polyfill. I highly recommend Jake Archibald’s [es6-promise](https://github.com/jakearchibald/es6-promise), but any polyfill that follows the specification should do.

For node.js, you may want to use the `--harmony` flag instead of a polyfill to get support for Promises.
