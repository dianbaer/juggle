(function (window) {
    if (!window.basic) window.basic = {};
    var JugglerEventType = function () {
        /**
         * 离开时间轴
         * @type {string}
         */
        this.REMOVE_FROM_JUGGLER = "removeFromJuggler";
    };
    window.basic.jugglerEventType = new JugglerEventType();
})(window);