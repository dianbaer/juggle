# juggle-tween





# juggle-tween是Tween类，拥有精准的动画

### 特点：

    1、每次调用都是开始值+（终点-起点）*（经过时间/总时间），这是最稳定的，没有任何误差
    2、连续调度，如果一次完成，剩余时间再次利用不浪费


### 依赖juggle-help，juggle-event，juggle-juggler

### 快速开始：

    npm install juggle-tween
	
	
	

线上例子地址：

https://www.threecss.com/juggle-tween-test/test.html



### 如何使用：


DisplayObject.js------------显示对象


```html

function DisplayObject(obj) {
    this.obj = obj;
    this.xValue = 0;
    this.yValue = 0;
    this.alphaValue = 0;
    this.visibility = "visible";
    this.getX = function () {
        return this.xValue;
    };
    this.setX = function (value) {
        this.xValue = value;
        this.draw();
    };
    this.getY = function () {
        return this.yValue;
    };
    this.setY = function (value) {
        this.yValue = value;
        this.draw();
    };
    this.getAlpha = function () {
        return this.alphaValue;
    };
    this.setAlpha = function (value) {
        this.alphaValue = value;
        this.draw();
    };
    this.setVisible = function (value) {
        if (value === true) {
            this.visibility = "visible";
        } else {
            this.visibility = "hidden";
        }
        this.draw();
    };
    this.draw = function () {
        this.obj.style.position = "absolute";
        this.obj.style.top = this.yValue + "px";
        this.obj.style.left = this.xValue + "px";
        this.obj.style.opacity = this.alphaValue;
        this.obj.style.filter = "alpha(opacity=" + (this.alphaValue * 100) + "%)";
        this.obj.style.visibility = this.visibility;
    }
}


```

test.html------------界面


```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../juggle-help/dist/juggle-help.js" type="text/javascript"></script>
    <script src="../juggle-event/dist/juggle-event.js" type="text/javascript"></script>
    <script src="../juggle-juggler/dist/juggle-juggler.js" type="text/javascript"></script>
    <script src="../juggle-tween/dist/juggle-tween.js" type="text/javascript"></script>
    <script src="DisplayObject.js" type="text/javascript"></script>
    <script type="text/javascript">
        var array = [
            "easeIn"
            , "easeOut"
            , "easeInOut"
            , "easeOutIn"
            , "easeInBack"
            , "easeOutBack"
            , "easeInOutBack"
            , "easeOutInBack"
            , "easeInElastic"
            , "easeOutElastic"
            , "easeInOutElastic"
            , "easeOutInElastic"
            , "easeInBounce"
            , "easeOutBounce"
            , "easeInOutBounce"
            , "easeOutInBounce"
            , "linear"
        ];
        var num = 0;

        function onRepeat() {
            num++;
            if (num % 2 === 0) {
                var string = array.shift();
                tween.setTransition(string);
                document.getElementById("tween_type").innerHTML = string;
                array.push(string);
            }

        }

        var tween;

        window.onload = function () {
            document.getElementById("tween_type").innerHTML = "linear";
            var display = new DisplayObject(document.getElementById("tween_div"));
            display.setAlpha(1);
            display.setX(100);
            display.setY(100);
            tween = juggle.tweenPool.fromPool(display, 2);
            tween.mReverse = true;
            tween.mRepeatCount = 0;
            tween.mRepeatDelay = 1;
            tween.setDelay(1);
            tween.animate(display.getX, display.setX, 800);
            tween.animate(display.getY, display.setY, 400);
            tween.mOnRepeat = onRepeat;
            juggle.jugglerManager.juggler.add(tween);
        }
    </script>
</head>
<body>
<div>
    <div id="tween_type" style="font-size: 12px;position: absolute;top: 20px;left: 200px">XXXXX</div>
</div>
<div style="background: #ffeca4;position: absolute;top: 100px;left: 100px; width: 800px;height: 400px;"></div>
<div id="tween_div" style="width: 100px; height: 100px; background: #ff6de8;"></div>

</body>
</html>

```




	