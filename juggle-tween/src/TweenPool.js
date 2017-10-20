(function (window) {
    if (!window.juggle) window.juggle = {};
    var tools = window.juggle.tools;
    var Tween = window.juggle.Tween;
    var TweenPool = function () {
        this.sTweenPool = [];

        this.fromPool = function (target, time, transition) {
            if (tools.isNull(transition)) {
                transition = "linear";
            }
            if (this.sTweenPool.length)
                return this.sTweenPool.pop().reset(target, time, transition);
            else {
                return new Tween(target, time, transition);
            }
        };

        this.toPool = function (tween) {
            tween.mOnStart = tween.mOnUpdate = tween.mOnRepeat = tween.mOnComplete = null;
            tween.mOnStartArgs = tween.mOnUpdateArgs = tween.mOnRepeatArgs = tween.mOnCompleteArgs = null;
            tween.mTarget = null;
            tween.mTransitionFunc = null;
            tween.mProperties.length = 0;
            tween.mStartValues.length = 0;
            tween.mEndValues.length = 0;
            this.sTweenPool[this.sTweenPool.length] = tween;
        }
    };
    window.juggle.tweenPool = new TweenPool();
})(window);