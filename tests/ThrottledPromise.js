const PromiseFactory = require('./util/PromiseFactory');
const ThrottledPromise = require('../');
const expect = require('chai').expect;

describe('ThrottledPromise.all()', () => {
    it('returns a Promise', () => {
        const promise = ThrottledPromise.all([], 2);
        expect(promise).to.be.an.instanceof(Promise);
    });

    it('resolves if all Promises resolve', (done) => {
        const promises = [
            PromiseFactory.getThrottledResolvedPromise(),
            PromiseFactory.getThrottledResolvedPromise(),
            PromiseFactory.getThrottledResolvedPromise()
        ];

        ThrottledPromise.all(promises, 2)
        .then(() => done())
        .catch((err) => done(new Error(`Resolved promises should resolve: ${err}`)));
    });

    it('rejects if any Promise rejects', (done) => {
        const promises = [
            PromiseFactory.getThrottledResolvedPromise(),
            PromiseFactory.getThrottledRejectedPromise(),
            PromiseFactory.getThrottledResolvedPromise()
        ];

        ThrottledPromise.all(promises, 2)
        .then(() => done(new Error('Rejected promises should reject')))
        .catch(() => done())
    });
});

describe('Non-promises', () => {
    it('resolves', (done) => {
        const promises = [1, 2, 3];

        ThrottledPromise.all(promises, 2)
            .then((data) => done())
            .catch((err) => done(new Error(`Valid non-promises should resolve: ${err}`)));
    });
});
