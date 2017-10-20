(function (window) {
    if (!window.juggle) window.juggle = {};
    var HttpEventType = function () {
        this.ERROR = "error";
        this.SUCCESS = "success";
    };
    window.juggle.httpEventType = new HttpEventType();
})(window);