(function (window) {
    if (!window.juggle) window.juggle = {};
    var tools = window.juggle.tools;
    /**
     * 创建事件
     * @param type 类型
     * @param bubbles 是否冒泡
     * @param data 携带数据
     * @constructor
     */
    var Event = function (type, bubbles, data) {
        //发起事件的对象
        this.mTarget = null;
        //监听到事件的对象
        this.mCurrentTarget = null;
        //事件类型
        this.mType = null;
        //是否冒泡
        this.mBubbles = null;
        //是否阻止向上冒泡
        this.mStopsPropagation = null;
        //是否阻止派发事件
        this.mStopsImmediatePropagation = null;
        //携带数据
        this.mData = null;
        /** 阻止向上冒泡，本次循环派发事件不阻止（无回调）* */
        this.stopPropagation = function () {
            this.mStopsPropagation = true;
        };
        /** 停止派发事件（无回调）* */
        this.stopImmediatePropagation = function () {
            this.mStopsPropagation = this.mStopsImmediatePropagation = true;
        };
        /**
         * 重置事件
         * @param type
         * @param bubbles
         * @param data
         * @returns {Event}
         */
        this.reset = function (type, bubbles, data) {
            if (tools.isNull(bubbles)) {
                bubbles = false;
            }
            if (tools.isNull(data)) {
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
    window.juggle.Event = Event;
})(window);