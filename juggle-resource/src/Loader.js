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