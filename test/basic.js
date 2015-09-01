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
    });
});

describe('ThrottledPromise.all()', function() {
    it('resolves', function(done) {
        var promises = [
            getThrottledResolvedPromise(),
            getThrottledResolvedPromise(),
            getThrottledResolvedPromise()
        ];

        ThrottledPromise.all(promises, 2)
            .then(function() { done() })
            .catch(function() { done(new Error('Resolved promises should resolve')) });
    });

    it('rejects', function(done) {
        var promises = [
            getThrottledResolvedPromise(),
            getThrottledRejectedPromise(),
            getThrottledResolvedPromise()
        ];

        ThrottledPromise.all(promises, 2)
            .then(function() { done(new Error('Rejected promises should reject')) })
            .catch(function() { done() });
    });
});

describe('Non-promises', function() {
    it('resolves', function(done) {
        var promises = [1, 2, 3];

        ThrottledPromise.all(promises, 2)
            .then(function(data) { done() })
            .catch(function() { done(new Error('Valid non-promises should resolve')) });
    });
});
