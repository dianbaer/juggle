(function (window) {
    if (!window.basic) window.basic = {};
    var ArrayTools = function () {
        /**
         * 判断数组里是否包含该对象
         * @param array
         * @param obj
         * @returns {number}
         */
        this.indexOf = function (array, obj) {
            var index = -1;
            if (array === null || obj === null) {
                return index;
            }
            for (var i = 0; i < array.length; i++) {
                if (array[i] === obj) {
                    index = i;
                    break;
                }
            }
            return index;
        }
    };
    window.basic.arrayTools = new ArrayTools();
})(window);