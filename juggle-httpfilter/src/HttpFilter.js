(function (window) {
    if (!window.juggle) window.juggle = {};
    var HttpClient = window.juggle.HttpClient;
    var httpEventType = window.juggle.httpEventType;
    var HttpFilter = function () {
        this.filterArray = [];
        this.addFilter = function (filter) {
            this.filterArray.push(filter);
        };
        this.filter = function (result) {
            for (var i = 0; i < this.filterArray.length; i++) {
                var filter = this.filterArray[i];
                var bool = filter.check(result);
                if (!bool) {
                    return false;
                }
            }
            return true;
        };
        this.send = function (data, url, header, type, isAsync, callObj, callSuccess, callError) {
            var httpClient = new HttpClient();
            httpClient.callObj = callObj;
            httpClient.callSuccess = callSuccess;
            httpClient.callError = callError;
            httpClient.send(data, url, header, type, isAsync);
            httpClient.addEventListener(httpEventType.SUCCESS, this.successHandle, this);
            httpClient.addEventListener(httpEventType.ERROR, this.errorHandle, this);
        };
        this.sendFile = function (fileList, data, url, header, type, isAsync, callObj, callSuccess, callError) {
            var httpClient = new HttpClient();
            httpClient.callObj = callObj;
            httpClient.callSuccess = callSuccess;
            httpClient.callError = callError;
            httpClient.sendFile(fileList, data, url, header, type, isAsync);
            httpClient.addEventListener(httpEventType.SUCCESS, this.successHandle, this);
            httpClient.addEventListener(httpEventType.ERROR, this.errorHandle, this);
        };
        this.successHandle = function (event) {
            var result = JSON.parse(event.mData);
            var httpClient = event.mTarget;
            var check = this.filter(result);
            if (check) {
                httpClient.callSuccess.call(httpClient.callObj, result);
            } else {
                httpClient.callError.call(httpClient.callObj);
            }

        };
        this.errorHandle = function (event) {
            var httpClient = event.mTarget;
            httpClient.callError.call(httpClient.callObj);
        }
    };
    window.juggle.httpFilter = new HttpFilter();
})(window);
