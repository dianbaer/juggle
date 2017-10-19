# basic-event

# basic-event是一个事件库，可用于解除包含结构，树形结构的耦合性。


### 特点：

    1、支持冒泡，前提冒泡对象的parent不为空并且isDisplayObject是true

    2、在派发事件的回调函数内将parent设置为null，不能阻止这一次parent接到这次事件

    3、在派发事件某层级的回调函数内，移除这层级的监听或添加这层级的监听，是不会影响这次派发事件目标的改变的。

    4、但是如果在某层级的回调函数内，移除上层的监听或添加上层的监听，上层本轮会受到影响。
	

### 依赖basic-help

### 快速开始：

    npm install basic-event

### 如何使用：

```html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="../basic-help/dist/basic-help.js" type="text/javascript"></script>
        <script src="../basic-event/dist/basic-event.js" type="text/javascript"></script>
        <script type="text/javascript">
            //继承EventDispatcher
            function DisplayObj() {
                this.parent = null;
                this.isDisplayObject = true;
                basic.EventDispatcher.apply(this);
                this.toString = function () {
                    return 'im DisplayObj';
                }
            }

            //继承DisplayObj
            function DisplayObjContainer() {
                DisplayObj.apply(this);
                this.addChild = function (child) {
                    child.parent = this;
                };
                this.removeChild = function (child) {
                    child.parent = null;
                }
                this.toString = function () {
                    return 'im DisplayObjContainer';
                }
            }

            //关注事件的函数类
            function Class1() {
                this.operate = function (event, data) {
                    alert(event.mCurrentTarget.toString());
                };
            }

            window.onload = function () {
                //创建DisplayObj对象
                var obj = new DisplayObj();
                //创建DisplayObjContainer对象
                var container = new DisplayObjContainer();
                //将container是obj的容器
                container.addChild(obj);
                //添加监听
                var clazz = new Class1();
                obj.addEventListener("aaa", clazz.operate, clazz);
                container.addEventListener("aaa", clazz.operate, clazz);
                //发布事件
                obj.dispatchEventWith("aaa", true, "bbb");

            }
        </script>
    </head>
    <body>

    </body>
    </html>

```




	