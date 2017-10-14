function ArrayTools() {
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

var jenoArrayTools = new ArrayTools();