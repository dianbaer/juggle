(function (window) {
    if (!window.basic) window.basic = {};
    var Event = function (type, bubbles, data) {
        this.mTarget = null;
        this.mCurrentTarget = null;
        this.mType = null;
        this.mBubbles = null;
        this.mStopsPropagation = null;
        this.mStopsImmediatePropagation = null;
        this.mData = null;
        /** 停止向上冒泡，这轮的事件广播不停（无回调）* */
        this.stopPropagation = function () {
            this.mStopsPropagation = true;
        };
        /** 立即停止事件广播（无回调）* */
        this.stopImmediatePropagation = function () {
            this.mStopsPropagation = this.mStopsImmediatePropagation = true;
        };
        this.reset = function (type, bubbles, data) {
            if (bubbles === undefined) {
                bubbles = false;
            }
            if (data === undefined) {
                data = null;
            }
            this.mType = type;
            this.mBubbles = bubbles;
            this.mData = data;
            this.mTarget = this.mCurrentTarget = null;
            this.mStopsPropagation = this.mStopsImmediatePropagation = false;
            return this;
        };
        this.reset(type, bubbles, data);
    };
    window.basic.Event = Event;
})(window);