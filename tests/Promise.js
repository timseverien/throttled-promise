describe('Promise', () => {
    it('resolves', (done) => Promise.resolve().then(() => done()));
    it('rejects', (done) => Promise.reject().catch(() => done()));
});
