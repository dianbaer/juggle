# juggle-delayedcall




# juggle-delayedcall是一个精准的延迟回调类


### 特点：


    1、连续调度，如果一次完成，剩余时间再次利用不浪费



### 依赖juggle-help，juggle-event，juggle-juggler


### 快速开始：


    npm install juggle-delayedcall


### 如何使用：

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../juggle-help/dist/juggle-help.js" type="text/javascript"></script>
    <script src="../juggle-event/dist/juggle-event.js" type="text/javascript"></script>
    <script src="../juggle-juggler/dist/juggle-juggler.js" type="text/javascript"></script>
    <script src="../juggle-delayedcall/dist/juggle-delayedcall.js" type="text/javascript"></script>
    <script type="text/javascript">
        function delayCallFunc(arg) {
            alert(delayedCall.isComplete());
        }

        var delayedCall;
        window.onload = function () {
            delayedCall = juggle.delayedCallPool.fromPool(delayCallFunc, 1, "1111");
            delayedCall.mRepeatCount = 5;
            juggle.jugglerManager.juggler.add(delayedCall);
        }
    </script>
</head>
<body>

</body>
</html>

```




	