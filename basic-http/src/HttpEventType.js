(function (window) {
    if (!window.basic) window.basic = {};
    var HttpEventType = function () {
        this.ERROR = "error";
        this.SUCCESS = "success";
    };
    window.basic.httpEventType = new HttpEventType();
})(window);