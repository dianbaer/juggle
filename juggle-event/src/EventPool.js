(function (window) {
    if (!window.juggle) window.juggle = {};
    var Event = window.juggle.Event;
    var EventPool = function () {
        this.sEventPool = [];
        /** 取事件池里面的事件，并且对事件进行重置（无回调）* */
        this.fromPool = function (type, bubbles, data) {
            if (this.sEventPool.length)
                return this.sEventPool.pop().reset(type, bubbles, data);
            else {
                return new Event(type, bubbles, data);
            }
        };
        /** 只清理两个目标和带来的数据，是为了可以释放资源，其他的不清理，等用的时候再重置（无回调）* */
        this.toPool = function (event) {
            event.mData = event.mTarget = event.mCurrentTarget = null;
            this.sEventPool[this.sEventPool.length] = event;
        };
    };
    window.juggle.eventPool = new EventPool();
})(window);

