# basic-delayedcall




# basic-delayedcall是一个精准的延迟回调类


### 特点：


    1、连续调度，如果一次完成，剩余时间再次利用不浪费



### 依赖basic-help，basic-event，basic-juggler


### 快速开始：


    npm install basic-delayedcall


### 如何使用：

```html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="../basic-help/dist/basic-help.js" type="text/javascript"></script>
        <script src="../basic-event/dist/basic-event.js" type="text/javascript"></script>
        <script src="../basic-juggler/dist/basic-juggler.js" type="text/javascript"></script>
        <script src="../basic-delayedcall/dist/basic-delayedcall.js" type="text/javascript"></script>
        <script type="text/javascript">
            function delayCallFunc(arg) {
                alert(delayedCall.isComplete());
            }

            var delayedCall;
            window.onload = function () {
                delayedCall = basic.delayedCallPool.fromPool(delayCallFunc, 1, "1111");
                delayedCall.mRepeatCount = 5;
                basic.jugglerManager.juggler.add(delayedCall);
            }
        </script>
    </head>
    <body>

    </body>
    </html>

```




	