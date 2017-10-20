(function (window) {
    if (!window.juggle) window.juggle = {};
    var Juggler = window.juggle.Juggler;
    var JugglerManager = function () {
        this.onEnterFrame = function () {
            var now = new Date().getTime();
            var passedTime = (now - juggle.jugglerManager.processTime) / 1000.0;
            juggle.jugglerManager.processTime = now;
            if (passedTime === 0.0 || this.isStop) {
                return;
            }
            juggle.jugglerManager.juggler.advanceTime(passedTime);
        };
        this.processTime = new Date().getTime();
        this.juggler = new Juggler();
        this.intervalId = setInterval(this.onEnterFrame, 25);
        this.isStop = false;
    };
    window.juggle.jugglerManager = new JugglerManager();
})(window);