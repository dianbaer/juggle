(function (window) {
    if (!window.basic) window.basic = {};
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
    window.basic.webSocketEventType = new WebSocketEventType();
})(window);