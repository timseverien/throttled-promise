const ThrottledPromiseFactory = require('./util/ThrottledPromiseFactory');
const ThrottledPromise = require('../');
const expect = require('chai').expect;

describe('ThrottledPromise.all()', () => {
    it('returns a Promise', () => {
        const promise = ThrottledPromise.all([], 2);
        expect(promise).to.be.an.instanceof(Promise);
    });

    it('resolves if all Promises resolve', (done) => {
        const promises = [
            ThrottledPromiseFactory.createResolving(),
            ThrottledPromiseFactory.createResolving(),
            ThrottledPromiseFactory.createResolving()
        ];

        ThrottledPromise.all(promises, 2)
        .then(() => done())
        .catch((err) => done(new Error(`Resolved promises should resolve: ${err}`)));
    });

    it('rejects if any Promise rejects', (done) => {
        const promises = [
            ThrottledPromiseFactory.createResolving(),
            ThrottledPromiseFactory.createRejecting(),
            ThrottledPromiseFactory.createResolving()
        ];

        ThrottledPromise.all(promises, 2)
        .then(() => done(new Error('Rejected promises should reject')))
        .catch(() => done())
    });

    it('should return values in correct order', (done) => {
        const promises = [
            ThrottledPromiseFactory.createResolving('Hello'),
            ThrottledPromiseFactory.createResolving('World'),
            ThrottledPromiseFactory.createResolving('!')
        ];

        ThrottledPromise.all(promises, 2).then((returnValues) => {
            expect(returnValues[0]).to.equal('Hello');
            expect(returnValues[1]).to.equal('World');
            expect(returnValues[2]).to.equal('!');
            done();
        });
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
