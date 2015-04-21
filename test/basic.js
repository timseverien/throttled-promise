var ThrottledPromise = require('../');

function getThrottledResolvedPromise() {
    return new ThrottledPromise(function(resolve, reject) {
        resolve();
    });
}

function getThrottledRejectedPromise() {
    return new ThrottledPromise(function(resolve, reject) {
        reject();
    });
}

describe('Promise', function() {
    it('resolves', function(done) {
        Promise.resolve().then(function() {
            done();
        });
    });

    it('rejects', function(done) {
        Promise.reject().catch(function() {
            done();
        });
    })
});

describe('ThrottledPromise.all()', function() {
    it('resolves', function(done) {
        var promises = [
            getThrottledResolvedPromise(),
            getThrottledResolvedPromise(),
            getThrottledResolvedPromise()
        ];

        ThrottledPromise.all(promises, 2)
            .then(function() { done() });
    });

    it('rejects', function(done) {
        var promises = [
            getThrottledResolvedPromise(),
            getThrottledRejectedPromise(),
            getThrottledResolvedPromise()
        ];

        ThrottledPromise.all(promises, 2)
            .then(function() { /* do nothing */ })
            .catch(function() { done() });
    });
});








/*
function getThrottledPromises(n) {
    var promises = [];

    while(n--) {
        promises.push(new ThrottledPromise(function(resolve, reject) {
            setTimeout(function() {

            }, Math.random() * 3000);
        }));
    }
}

ThrottledPromise.all(getThrottledPromises(10)); */