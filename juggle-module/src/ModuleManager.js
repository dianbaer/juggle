(function (window) {
    if (!window.juggle) window.juggle = {};
    var resourceManager = window.juggle.resourceManager;
    var ModuleManager = function () {
        this.moduleUrlToData = [];
        this.moduleTypeToData = [];
        /**
         * 加载模块
         * @param url 地址
         * @param container 该模块容器
         * @param type 类型，如果已经该类型则将原模块卸载，加载新模块
         * @param mediator 模块控制器
         * @param data 额外数据
         */
        this.loadModule = function (url, container, type, mediator, data) {
            var moduleData = {
                "url": url,
                "container": container,
                "type": type,
                "mediator": mediator,
                "data": data
            };
            this.moduleUrlToData[url] = moduleData;
            resourceManager.loadResource([url], this.loadComplete, this.loadFail, this);
        };
        this.loadFail = function (url) {

        };
        this.loadComplete = function (url) {
            var moduleData = this.moduleUrlToData[url[0]];
            //在未加载完成就卸载，会出现这种情况
            if (moduleData === null || moduleData === undefined) {
                return;
            }
            var resource = resourceManager.getResource(url[0]);
            if (moduleData.type !== null && moduleData.type !== undefined) {
                var oldModuleData = this.moduleTypeToData[moduleData.type];
                if (oldModuleData !== null && oldModuleData !== undefined) {
                    oldModuleData.mediator.dispose();
                }
                this.moduleTypeToData[moduleData.type] = moduleData;
            }
            moduleData.container.innerHTML = resource;
            moduleData.mediator.initView(moduleData.container, moduleData.data);
        };
        this.unLoadModule = function (url) {
            var moduleData = this.moduleUrlToData[url];
            if (moduleData !== null && moduleData !== undefined) {
                moduleData.mediator.dispose();
                delete this.moduleUrlToData[url];
                delete this.moduleTypeToData[moduleData.type];
            }
        }
    };
    window.juggle.moduleManager = new ModuleManager();
})(window);