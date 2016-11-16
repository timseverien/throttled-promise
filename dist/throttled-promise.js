(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ThrottledPromise = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!Promise || !('all' in Promise) || !(typeof Promise.all === 'function')) {
  throw new Error('Promise is undefined. You may want to include a polyfill.');
}

var ThrottledPromise = function () {
  /**
   * Creates a new Throttled Promise.
   * @param {Function} callback - The function to execute.
   */
  function ThrottledPromise(callback) {
    _classCallCheck(this, ThrottledPromise);

    if (typeof callback !== 'function') {
      throw new Error('ThrottledPromise only accepts a function.');
    }

    this.callback = callback;
  }

  /**
   * Run the ThrottledPromise.
   * @return {Promise}
   */


  _createClass(ThrottledPromise, [{
    key: 'run',
    value: function run() {
      return new Promise(this.callback);
    }

    /**
     * Run all `promises` in parallel, limited to `threads`.
     * @param {Array} promises - An array of `ThrottledPromise`s.
     * @param {Number} threads - The max amount of threads to be executed in parallel.
     * @return {Promise}
     */

  }], [{
    key: 'all',
    value: function all(promises) {
      var threads = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

      if (!Array.isArray(promises)) {
        throw new Error('promises must be an array.');
      }
      if (!Number.isInteger(threads)) {
        throw new Error('threads must be an integer.');
      }

      if (promises.length === 0) {
        return Promise.resolve([]);
      }

      var promisesCount = promises.length;
      var resolveValues = [];

      var promisesCompleted = 0;

      /**
       * Starts next Promise.
       * @param {Function} resolve - The function to execute after a Promise resolves.
       * @param {Function} reject - The function to execute after a Promise rejects.
       * @return {Promise}
       */
      var next = function next(resolve, reject) {
        var index = promisesCount - promises.length;
        var tp = promises.shift();

        if (!(tp instanceof ThrottledPromise)) {
          resolveValues[index] = tp;
          promisesCompleted++;

          finishPromise(resolve, reject);
        }

        return tp.run().then(function (resolveValue) {
          resolveValues[index] = resolveValue;
          promisesCompleted++;

          finishPromise(resolve, reject);
        }).catch(reject);
      };

      /**
       * Finish a Promise and continue the queue.
       * @param {Function} resolve - The function to execute after a Promise resolves.
       * @param {Function} reject - The function to execute after a Promise rejects.
       */
      var finishPromise = function finishPromise(resolve, reject) {
        if (promises.length > 0) {
          next(resolve, reject);
        } else if (promisesCompleted === promisesCount) {
          resolve();
        }
      };

      return new Promise(function (resolve, reject) {
        var threadsCount = Math.min(promisesCount, threads);

        for (var i = 0; i < threadsCount; i++) {
          next(resolve, reject);
        }
      }).then(function () {
        return resolveValues;
      });
    }
  }]);

  return ThrottledPromise;
}();

exports.default = ThrottledPromise;

},{}]},{},[1])(1)
});