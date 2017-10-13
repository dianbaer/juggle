function ArrayTools() {
    /**
     * 获取数组里传入对象的索引，-1是不包含
     * @param array 数组
     * @param obj 对象
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
}
var arrayTools = new ArrayTools();