describe('Backbone.Validator.CONSTRAINT', function () {
    describe('DEFAULTS', function () {
        describe('required', function () {
            var required = Backbone.Validator.CONSTRAINT.DEFAULTS.required;

            it('undefined is false', function () {
                expect(required()).to.be.eql(false);
            });
            it('null is false', function () {
                expect(required(null)).to.be.eql(false);
            });
            it('"aaaa" is true', function () {
                expect(required('aaaa')).to.be.eql(true);
            });
        });
        describe('length', function () {
            var len = Backbone.Validator.CONSTRAINT.DEFAULTS.length;

            it('"aaa" is true on 0 to 10 or less', function () {
                expect(len('aaa', 0, 10)).to.be.eql(true);
            });
            it('"aaa" is true on 0 to 3 or less', function () {
                expect(len('aaa', 0, 3)).to.be.eql(true);
            });
            it('"aaa" is true on 1 to 3 or less', function () {
                expect(len('aaa', 1, 3)).to.be.eql(true);
            });
            it('"aaa" is false on 0 to 2 or less', function () {
                expect(len('aaa', 0, 2)).to.be.eql(false);
            });
            it('"" is true on 0 to 3 or less', function () {
                expect(len('', 0, 3)).to.be.eql(true);
            });
            it('"" is false on 1 to 3 or less', function () {
                expect(len('', 1, 3)).to.be.eql(false);
            });
        });
        describe('select', function () {
            var select = Backbone.Validator.CONSTRAINT.DEFAULTS.select;

            it('a is true', function () {
                expect(select('a', ['a', 'b', 'c'])).to.be.eql(true);
            });
            it('d is not  within a b c', function () {
                expect(select('d', ['a', 'b', 'c'])).to.be.eql(false);
            });
        });
    });
});
