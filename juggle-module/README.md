# juggle-module



# juggle-module是模块类，支持模块加载卸载




### 依赖juggle-help，juggle-event，juggle-http，juggle-resource，juggle-mv

### 快速开始：

    npm install juggle-module

### 如何使用：

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../juggle-help/dist/juggle-help.js" type="text/javascript"></script>
    <script src="../juggle-event/dist/juggle-event.js" type="text/javascript"></script>
    <script src="../juggle-http/dist/juggle-http.js" type="text/javascript"></script>
    <script src="../juggle-resource/dist/juggle-resource.js" type="text/javascript"></script>
    <script src="../juggle-mv/dist/juggle-mv.js" type="text/javascript"></script>
    <script src="../juggle-module/dist/juggle-module.js" type="text/javascript"></script>
    <script type="text/javascript">
        function TopMediator() {
            //必须要有的
            this.listNotificationInterests = ["test", "test2"];
            //必须要有
            this.handleNotification = function (data) {
                switch (data.name) {
                    case "test":
                        alert("Index1Mediator接到数据" + data.body);
                        break;
                    case "test2":
                        alert("Index1Mediator接到数据" + data.body);
                        break;
                }
            };
            this.initView = function (view, data) {

            };
            juggle.Mediator.apply(this);
        }
        function BottomMediator() {
            this.initView = function (view, data) {

            };
            juggle.Mediator.apply(this);
        }
        function BodyMediator() {
            this.initView = function (view, data) {

            };
            juggle.Mediator.apply(this);
        }
        function Body1Mediator() {
            this.initView = function (view, data) {

            };
            juggle.Mediator.apply(this);
        }
        function NoneMediator() {
            this.initView = function (view, data) {

            };
            juggle.Mediator.apply(this);
        }
        window.onload = function () {
            //简单的加载
            juggle.moduleManager.loadModule("top.html", document.getElementById("top"), null, new TopMediator(), "1111");
            //相同类型替换
            juggle.moduleManager.loadModule("body.html", document.getElementById("body"), "body", new BodyMediator(), "222");
            juggle.moduleManager.loadModule("body1.html", document.getElementById("body"), "body", new Body1Mediator(), "333");
            //卸载了，加载成功后不起作用
            juggle.moduleManager.loadModule("bottom.html", document.getElementById("bottom"), null, new BottomMediator(), "444");
            juggle.moduleManager.unLoadModule("bottom.html");
            //加载失败不起作用
            juggle.moduleManager.loadModule("none.html", document.getElementById("unloadcontent"), null, new NoneMediator(), "555");
        }
    </script>
</head>
<body>
<div id="top"></div>
<div id="body"></div>
<div id="bottom"></div>
<div id="unloadcontent"></div>
</body>
</html>

```




	