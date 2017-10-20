(function (window) {
    if (!window.juggle) window.juggle = {};
    var JugglerEventType = function () {
        /**
         * 离开时间轴
         * @type {string}
         */
        this.REMOVE_FROM_JUGGLER = "removeFromJuggler";
    };
    window.juggle.jugglerEventType = new JugglerEventType();
})(window);