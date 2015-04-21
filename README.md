ThrottledPromise
================

Promises is one of the best things of this age that saves us from callback hells. It’s great for running parallel async processes.

Imagine hundreds of parallel HTTP requests— hey, wait a minute! I don’t want hundreds of parallel requests! That’s right, Promises are great, but the API only lets us run things parallel or in sequence. But sometimes, when you don’t want to kill your server (or client), you may want to throttle the request. ThrottledPromise is our saviour.

## Installation

For using with node.js or io.js:

    npm install throttled-promise

Yep, there’s a bower module as well:

    bower install throttled-promise

## Usage

There are just two things you have to remember:

1. Use `ThrottledPromise.all([ ... ], n)` to throttle promises
2. Don’t use `Promise`, but `ThrottlePromise` as constructor for those promises

Note that `ThrottlePromise` objects do not have the methods `.then()`, `.catch()`, etc. It was never designed to be a substitution. It’s merely a wrapper for Promise so the Promise does not execute immediately. `ThrottlePromise.all()` does return a Promise, so you can still chain things.

    var ThrottledPromise = require('throttled-promise'),
        promises = [
            new ThrottledPromise(function(resolve, reject) { ... }),
            new ThrottledPromise(function(resolve, reject) { ... }),
            new ThrottledPromise(function(resolve, reject) { ... })
        ];
    
    // Run promises, but only 2 parallel
    ThrottledPromise.all(promises, 2)
    .then( ... )
    .catch( ... );

## Support

This module *does not* contain a polyfill for Promise. This is something you have to take care of yourself.

You may need to use the `--harmony` flag for node.js to use Promises.