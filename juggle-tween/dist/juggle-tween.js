(function (window) {
    if (!window.juggle) window.juggle = {};
    var Transitions = function () {
        this.LINEAR = "linear";
        this.EASE_IN = "easeIn";
        this.EASE_OUT = "easeOut";
        this.EASE_IN_OUT = "easeInOut";
        this.EASE_OUT_IN = "easeOutIn";
        this.EASE_IN_BACK = "easeInBack";
        this.EASE_OUT_BACK = "easeOutBack";
        this.EASE_IN_OUT_BACK = "easeInOutBack";
        this.EASE_OUT_IN_BACK = "easeOutInBack";
        this.EASE_IN_ELASTIC = "easeInElastic";
        this.EASE_OUT_ELASTIC = "easeOutElastic";
        this.EASE_IN_OUT_ELASTIC = "easeInOutElastic";
        this.EASE_OUT_IN_ELASTIC = "easeOutInElastic";
        this.EASE_IN_BOUNCE = "easeInBounce";
        this.EASE_OUT_BOUNCE = "easeOutBounce";
        this.EASE_IN_OUT_BOUNCE = "easeInOutBounce";
        this.EASE_OUT_IN_BOUNCE = "easeOutInBounce";

        this.sTransitions = null;

        this.getTransition = function (name) {
            if (this.sTransitions === null)
                this.registerDefaults();
            return this.sTransitions[name];
        };
        this.register = function (name, func) {
            if (this.sTransitions === null)
                this.registerDefaults();
            this.sTransitions[name] = func;
        };
        this.registerDefaults = function () {
            this.sTransitions = [];

            this.register(this.LINEAR, this.linear);
            this.register(this.EASE_IN, this.easeIn);
            this.register(this.EASE_OUT, this.easeOut);
            this.register(this.EASE_IN_OUT, this.easeInOut);
            this.register(this.EASE_OUT_IN, this.easeOutIn);
            this.register(this.EASE_IN_BACK, this.easeInBack);
            this.register(this.EASE_OUT_BACK, this.easeOutBack);
            this.register(this.EASE_IN_OUT_BACK, this.easeInOutBack);
            this.register(this.EASE_OUT_IN_BACK, this.easeOutInBack);
            this.register(this.EASE_IN_ELASTIC, this.easeInElastic);
            this.register(this.EASE_OUT_ELASTIC, this.easeOutElastic);
            this.register(this.EASE_IN_OUT_ELASTIC, this.easeInOutElastic);
            this.register(this.EASE_OUT_IN_ELASTIC, this.easeOutInElastic);
            this.register(this.EASE_IN_BOUNCE, this.easeInBounce);
            this.register(this.EASE_OUT_BOUNCE, this.easeOutBounce);
            this.register(this.EASE_IN_OUT_BOUNCE, this.easeInOutBounce);
            this.register(this.EASE_OUT_IN_BOUNCE, this.easeOutInBounce);
        };
        this.linear = function (ratio) {
            return ratio;
        };

        this.easeIn = function (ratio) {
            return ratio * ratio * ratio;
        };

        this.easeOut = function (ratio) {
            var invRatio = ratio - 1.0;
            return invRatio * invRatio * invRatio + 1;
        };

        this.easeInOut = function (ratio) {
            return this.easeCombined(this.easeIn, this.easeOut, ratio);
        };

        this.easeOutIn = function (ratio) {
            return this.easeCombined(this.easeOut, this.easeIn, ratio);
        };

        this.easeInBack = function (ratio) {
            var s = 1.70158;
            return Math.pow(ratio, 2) * ((s + 1.0) * ratio - s);
        };

        this.easeOutBack = function (ratio) {
            var invRatio = ratio - 1.0;
            var s = 1.70158;
            return Math.pow(invRatio, 2) * ((s + 1.0) * invRatio + s) + 1.0;
        };

        this.easeInOutBack = function (ratio) {
            return this.easeCombined(this.easeInBack, this.easeOutBack, ratio);
        };

        this.easeOutInBack = function (ratio) {
            return this.easeCombined(this.easeOutBack, this.easeInBack, ratio);
        };

        this.easeInElastic = function (ratio) {
            if (ratio === 0 || ratio === 1)
                return ratio;
            else {
                var p = 0.3;
                var s = p / 4.0;
                var invRatio = ratio - 1;
                return -1.0 * Math.pow(2.0, 10.0 * invRatio) * Math.sin((invRatio - s) * (2.0 * Math.PI) / p);
            }
        };

        this.easeOutElastic = function (ratio) {
            if (ratio === 0 || ratio === 1)
                return ratio;
            else {
                var p = 0.3;
                var s = p / 4.0;
                return Math.pow(2.0, -10.0 * ratio) * Math.sin((ratio - s) * (2.0 * Math.PI) / p) + 1;
            }
        };

        this.easeInOutElastic = function (ratio) {
            return this.easeCombined(this.easeInElastic, this.easeOutElastic, ratio);
        };

        this.easeOutInElastic = function (ratio) {
            return this.easeCombined(this.easeOutElastic, this.easeInElastic, ratio);
        };

        this.easeInBounce = function (ratio) {
            return 1.0 - this.easeOutBounce(1.0 - ratio);
        };

        this.easeOutBounce = function (ratio) {
            var s = 7.5625;
            var p = 2.75;
            var l;
            if (ratio < (1.0 / p)) {
                l = s * Math.pow(ratio, 2);
            } else {
                if (ratio < (2.0 / p)) {
                    ratio -= 1.5 / p;
                    l = s * Math.pow(ratio, 2) + 0.75;
                } else {
                    if (ratio < 2.5 / p) {
                        ratio -= 2.25 / p;
                        l = s * Math.pow(ratio, 2) + 0.9375;
                    } else {
                        ratio -= 2.625 / p;
                        l = s * Math.pow(ratio, 2) + 0.984375;
                    }
                }
            }
            return l;
        };

        this.easeInOutBounce = function (ratio) {
            return this.easeCombined(this.easeInBounce, this.easeOutBounce, ratio);
        };

        this.easeOutInBounce = function (ratio) {
            return this.easeCombined(this.easeOutBounce, this.easeInBounce, ratio);
        };

        this.easeCombined = function (startFunc, endFunc, ratio) {
            if (ratio < 0.5)
                return 0.5 * startFunc.call(juggle.transitions, ratio * 2.0);
            else
                return 0.5 * endFunc.call(juggle.transitions, (ratio - 0.5) * 2.0) + 0.5;
        }
    };
    window.juggle.transitions = new Transitions();
})(window);
(function (window) {
    if (!window.juggle) window.juggle = {};
    var tools = window.juggle.tools;
    var EventDispatcher = window.juggle.EventDispatcher;
    var transitions = window.juggle.transitions;
    var jugglerEventType = window.juggle.jugglerEventType;
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
    window.juggle.Tween = Tween;
})(window);
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