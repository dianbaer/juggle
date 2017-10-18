(function (window) {
    if (!window.basic) window.basic = {};
    var tools = window.basic.tools;
    var DelayedCall = window.basic.DelayedCall;
    var DelayedCallPool = function () {
        this.sDelayedCallPool = [];

        this.fromPool = function (call, delay, args) {
            if (tools.isNull(args)) {
                args = null;
            }
            if (this.sDelayedCallPool.length)
                return this.sDelayedCallPool.pop().reset(call, delay, args);
            else {
                return new DelayedCall(call, delay, args);
            }
        };
        this.toPool = function (delayedCall) {
            delayedCall.mCall = null;
            delayedCall.mArgs = null;
            this.sDelayedCallPool[this.sDelayedCallPool.length] = delayedCall;
        }
    };
    window.basic.delayedCallPool = new DelayedCallPool();
})(window);