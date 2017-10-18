(function (window) {
    if (!window.basic) window.basic = {};
    var Juggler = window.basic.Juggler;
    var JugglerManager = function () {
        this.onEnterFrame = function () {
            var now = new Date().getTime();
            var passedTime = (now - basic.jugglerManager.processTime) / 1000.0;
            basic.jugglerManager.processTime = now;
            if (passedTime === 0.0 || this.isStop) {
                return;
            }
            basic.jugglerManager.juggler.advanceTime(passedTime);
        };
        this.processTime = new Date().getTime();
        this.juggler = new Juggler();
        this.intervalId = setInterval(this.onEnterFrame, 25);
        this.isStop = false;
    };
    window.basic.jugglerManager = new JugglerManager();
})(window);