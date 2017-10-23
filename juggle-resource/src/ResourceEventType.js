(function (window) {
    if (!window.juggle) window.juggle = {};
    function ResourceEventType() {
        /**
         * 加载完成
         * @type {string}
         */
        this.LOAD_COMPLETE = "loadComplete";
        /**
         * 加载失败
         * @type {string}
         */
        this.LOAD_FAIL = "loadFail";
    }

    window.juggle.resourceEventType = new ResourceEventType();
})(window);