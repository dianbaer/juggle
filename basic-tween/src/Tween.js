(function (window) {
    if (!window.basic) window.basic = {};
    var tools = window.basic.tools;
    var EventDispatcher = window.basic.EventDispatcher;
    var transitions = window.basic.transitions;
    var jugglerEventType = window.basic.jugglerEventType;
    /**
     * 核心在于每次调用都是开始值+（终点-起点）*（经过时间/总时间），这是最稳定的，没有任何误差
     * @param target
     * @param time
     * @param transition
     * @constructor
     */
    var Tween = function (target, time, transition) {
        //动画目标
        this.mTarget = null;
        //动画变换函数
        this.mTransitionFunc = null;
        //设置属性的函数列表
        this.mProperties = null;
        //起始值（这个值时获取属性函数自动获取到的）
        this.mStartValues = null;
        //结束值
        this.mEndValues = null;
        //每个阶段的回调函数
        this.mOnStart = null;
        this.mOnUpdate = null;
        this.mOnRepeat = null;
        this.mOnComplete = null;
        //每个阶段回调函数携带的参数
        this.mOnStartArgs = null;
        this.mOnUpdateArgs = null;
        this.mOnRepeatArgs = null;
        this.mOnCompleteArgs = null;
        //总时间
        this.mTotalTime = null;
        //当前时间
        this.mCurrentTime = null;

        //开始动画时延迟调用时间，修改这个参数没有，需要调方法setDelay
        this.mDelay = null;
        //是否取整，取整动画不平滑
        this.mRoundToInt = false;
        //0代表无限次重复，>1代表重复次数
        this.mRepeatCount = null;
        //重复动画时延迟调用间隔
        this.mRepeatDelay = null;
        //偶数轮是否逆向
        this.mReverse = null;
        //当前第几轮，初始为-1，跟mReverse参数搭配使用
        this.mCurrentCycle = null;
        this.reset = function (target, time, transition) {
            if (tools.isNull(transition)) {
                transition = "linear";
            }
            this.mTarget = target;
            this.mCurrentTime = 0.0;
            this.mTotalTime = Math.max(0.0001, time);
            this.mDelay = this.mRepeatDelay = 0.0;
            this.mOnStart = this.mOnUpdate = this.mOnRepeat = this.mOnComplete = null;
            this.mOnStartArgs = this.mOnUpdateArgs = this.mOnRepeatArgs = this.mOnCompleteArgs = null;
            this.mRoundToInt = this.mReverse = false;
            this.mRepeatCount = 1;
            this.mCurrentCycle = -1;
            this.setTransition(transition);
            if (this.mProperties) {
                this.mProperties.length = 0;
            } else {
                this.mProperties = [];
            }
            if (this.mStartValues) {
                this.mStartValues.length = 0;
            } else {
                this.mStartValues = [];
            }
            if (this.mEndValues) {
                this.mEndValues.length = 0;
            } else {
                this.mEndValues = [];
            }
            return this;
        };

        /**
         * 设置动画
         * @param getValue 获取值得方法
         * @param setValue 设置值得方法
         * @param endValue 达到值
         */
        this.animate = function (getValue, setValue, endValue) {
            if (tools.isNull(this.mTarget))
                return;
            this.mProperties[this.mProperties.length] = setValue;
            this.mStartValues[this.mStartValues.length] = getValue.call(this.mTarget);
            this.mEndValues[this.mEndValues.length] = endValue;
        };
        this.advanceTime = function (time) {
            //经历时间为0或者重复次数是1并且当前时间等于总时间
            if (time === 0 || (this.mRepeatCount === 1 && this.mCurrentTime === this.mTotalTime))
                return;
            var i;
            var restTime = this.mTotalTime - this.mCurrentTime;
            //多余的时间
            var carryOverTime = time > restTime ? time - restTime : 0.0;
            this.mCurrentTime += time;
            //小于等于0说明还没开始
            if (this.mCurrentTime <= 0)
                return;
            //大于总时间则设置等于总时间，前面已经取出多余的时间
            else if (this.mCurrentTime > this.mTotalTime)
                this.mCurrentTime = this.mTotalTime;
            //开始动画
            if (this.mCurrentCycle < 0) {
                this.mCurrentCycle++;
                if (!tools.isNull(this.mOnStart))
                    this.mOnStart.call(this, this.mOnStartArgs);
            }
            //比例
            var ratio = this.mCurrentTime / this.mTotalTime;
            //是否逆向计算
            var reversed = this.mReverse && (this.mCurrentCycle % 2 === 1);
            var numProperties = this.mStartValues.length;
            //进度
            var mProgress = reversed ? this.mTransitionFunc.call(transitions, 1.0 - ratio) : this.mTransitionFunc.call(transitions, ratio);

            for (i = 0; i < numProperties; ++i) {
                var startValue = this.mStartValues[i];
                var endValue = this.mEndValues[i];
                var delta = endValue - startValue;
                //每次都是开始值+应该增加的值，这样没有误差
                var currentValue = startValue + mProgress * delta;
                //取整
                if (this.mRoundToInt)
                    currentValue = Math.round(currentValue);
                //改变属性
                this.mProperties[i].call(this.mTarget, currentValue);
            }
            if (!tools.isNull(this.mOnUpdate))
                this.mOnUpdate.call(this, this.mOnUpdateArgs);
            //相等时
            if (this.mCurrentTime === this.mTotalTime) {
                //无限次或者大于1次
                if (this.mRepeatCount === 0 || this.mRepeatCount > 1) {
                    this.mCurrentTime = -this.mRepeatDelay;
                    this.mCurrentCycle++;
                    if (this.mRepeatCount > 1)
                        this.mRepeatCount--;
                    if (!tools.isNull(this.mOnRepeat))
                        this.mOnRepeat.call(this, this.mOnRepeatArgs);
                } else {
                    //保存成功回调函数和回调参数，防止派发事件的时候清理这些属性，很安全
                    var onComplete = this.mOnComplete;
                    var onCompleteArgs = this.mOnCompleteArgs;
                    //先派发事件，在回调完成函数
                    this.dispatchEventWith(jugglerEventType.REMOVE_FROM_JUGGLER);
                    if (!tools.isNull(onComplete))
                        onComplete.call(this, onCompleteArgs);
                }
            }
            //这块也不用担心，advanceTime开头有限制，如果是完成了，直接返回
            if (carryOverTime)
                this.advanceTime(carryOverTime);
        };

        this.isComplete = function () {
            //这块也是，只有可能等于
            return this.mCurrentTime === this.mTotalTime && this.mRepeatCount === 1;
        };
        this.setTransition = function (value) {
            this.mTransitionFunc = transitions.getTransition(value);
        };
        /**
         * 修改延迟，先加回原先的延迟，再减去现在的延迟
         * @param value
         */
        this.setDelay = function (value) {
            this.mCurrentTime = this.mCurrentTime + this.mDelay - value;
            this.mDelay = value;
        };
        this.reset(target, time, transition);
        EventDispatcher.apply(this);
    };
    window.basic.Tween = Tween;
})(window);