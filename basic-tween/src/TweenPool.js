function TweenPool() {
    this.sTweenPool = new Array();

    this.fromPool = function (target, time, transition) {
        if (transition == undefined) {
            transition = "linear";
        }
        if (this.sTweenPool.length)
            return this.sTweenPool.pop().reset(target, time, transition, true);
        else {
            var tween = new Tween();
            tween.Tween(target, time, transition, true)
            return tween;
        }
    }

    this.toPool = function (tween) {
        tween.mOnStart = tween.mOnUpdate = tween.mOnRepeat = tween.mOnComplete = null;
        tween.mOnStartArgs = tween.mOnUpdateArgs = tween.mOnRepeatArgs = tween.mOnCompleteArgs = null;
        tween.mTarget = null;
        tween.mTransitionFunc = null;
        tween.mProperties.length = 0;
        tween.mStartValues.length = 0;
        tween.mEndValues.length = 0;
        tween.mNextTween = null;
        this.sTweenPool[this.sTweenPool.length] = tween;
    }
}
$T.tweenPool = new TweenPool();