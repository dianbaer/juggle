(function (window) {
    if (!window.juggle) window.juggle = {};
    var WebSocketEventType = function () {
        // 链接完成
        this.CONNECTED = "connected";
        // 关闭
        this.CLOSE = "close";
        // 接到消息
        this.WSMESSAGE = "wsmessage";
        this.getMessage = function (wsOpCode) {
            return this.WSMESSAGE + "_" + wsOpCode;
        }
    };
    window.juggle.webSocketEventType = new WebSocketEventType();
})(window);