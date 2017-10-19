(function (window) {
    if (!window.basic) window.basic = {};
    var WebSocketConfig = function () {
        this.WSOPCODE = "wsOpCode";// 操作码
    };
    window.basic.webSocketConfig = new WebSocketConfig();
})(window);