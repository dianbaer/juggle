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
(function (window) {
    if (!window.juggle) window.juggle = {};
    var EventDispatcher = window.juggle.EventDispatcher;
    var HttpClient = window.juggle.HttpClient;
    var httpEventType = window.juggle.httpEventType;
    var resourceEventType = window.juggle.resourceEventType;
    var Loader = function (loadList, data) {
        /**
         * 加载成功
         * @param event
         */
        this.loadSuccess = function (event) {
            this.resultArray[event.mTarget.url] = event.mData;
            this.successNum++;
            if (this.successNum + this.failNum === this.loadList.length) {
                if (this.failNum > 0) {
                    this.dispatchEventWith(resourceEventType.LOAD_FAIL);
                } else {
                    this.dispatchEventWith(resourceEventType.LOAD_COMPLETE);
                }
            }
        };
        /**
         * 加载失败
         * @param event
         */
        this.loadError = function (event) {
            this.failNum++;
            if (this.successNum + this.failNum === this.loadList.length) {
                this.dispatchEventWith(resourceEventType.LOAD_FAIL);
            }

        };
        this.loadList = loadList;
        this.resultArray = [];
        this.successNum = 0;
        this.failNum = 0;
        this.data = data;
        EventDispatcher.apply(this);
        //获取资源
        for (var i = 0; i < this.loadList.length; i++) {
            var httpClient = new HttpClient();
            httpClient.send(null, this.loadList[i]);
            httpClient.addEventListener(httpEventType.SUCCESS, this.loadSuccess, this);
            httpClient.addEventListener(httpEventType.ERROR, this.loadError, this);
        }
    };
    window.juggle.Loader = Loader;
})(window);
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