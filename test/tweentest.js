describe('geom', function () {
    var tween;
    beforeEach('init matrix', function () {
        tween = new juggle.Tween();
    });

    describe('Matrix', function () {
        it('concat', function () {


            tween.mRepeatCount.should.eql(1);
        });
    });
});

