# juggle-resource



# juggle-resouce是一个资源库，支持加载多资源回调。



	

### 依赖juggle-help，juggle-event，juggle-http

### 快速开始：

    npm install juggle-resource

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
    <script type="text/javascript">

        function success(data) {
            alert("加载成功例子，加载成功");
            alert(juggle.resourceManager.getResource(data[0]));
            alert(juggle.resourceManager.getResource(data[1]));
        }
        function fail(event) {
            alert("加载成功例子，加载失败");
        }
        function success1(event) {
            alert("加载失败例子，加载成功");
        }
        function fail1(event) {
            alert("加载失败例子，加载失败");
        }
        window.onload = function () {
            juggle.resourceManager.loadResource(["resource1.html", "resource2.html"], success, fail, this);
            juggle.resourceManager.loadResource(["resource1.html", "resource2.html", "resource3.html"], success1, fail1, this);
        };

    </script>
</head>
<body>

</body>
</html>

```




	