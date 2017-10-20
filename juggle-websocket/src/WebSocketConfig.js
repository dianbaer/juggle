(function (window) {
    if (!window.juggle) window.juggle = {};
    var WebSocketConfig = function () {
        this.WSOPCODE = "wsOpCode";// 操作码
    };
    window.juggle.webSocketConfig = new WebSocketConfig();
})(window);