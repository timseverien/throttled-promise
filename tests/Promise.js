const PromiseFactory = require('./util/PromiseFactory');

describe('Promise', () => {
    it('resolves', (done) => Promise.resolve().then(() => done()));
    it('rejects', (done) => Promise.reject().catch(() => done()));
});
