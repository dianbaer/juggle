(function (window) {
    if (!window.juggle) window.juggle = {};
    var Loader = window.juggle.Loader;
    var resourceEventType = window.juggle.resourceEventType;
    var ResourceManager = function () {
        this.resource = [];
        this.loadResource = function (url, success, fail, obj) {
            var loader = new Loader(url, [success, fail, obj]);
            loader.addEventListener(resourceEventType.LOAD_COMPLETE, this.loadComplete, this);
            loader.addEventListener(resourceEventType.LOAD_FAIL, this.loadFail, this);
        };
        /**
         * 成功回调
         * @param event
         */
        this.loadComplete = function (event) {
            event.mTarget.removeEventListener(resourceEventType.LOAD_COMPLETE, this.loadComplete);
            event.mTarget.removeEventListener(resourceEventType.LOAD_FAIL, this.loadComplete);
            for (var i = 0; i < event.mTarget.loadList.length; i++) {
                var url = event.mTarget.loadList[i];
                this.resource[url] = event.mTarget.resultArray[url];
            }
            event.mTarget.data[0].call(event.mTarget.data[2], event.mTarget.loadList);
        };
        /**
         * 失败回调
         * @param event
         */
        this.loadFail = function (event) {
            event.mTarget.removeEventListener(resourceEventType.LOAD_COMPLETE, this.loadComplete);
            event.mTarget.removeEventListener(resourceEventType.LOAD_FAIL, this.loadComplete);
            event.mTarget.data[1].call(event.mTarget.data[1], event.mTarget.loadList);
        };
        this.getResource = function (url) {
            return this.resource[url];
        }
    };
    window.juggle.resourceManager = new ResourceManager();
})(window);