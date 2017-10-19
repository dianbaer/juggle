# basic-mv

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/basic-mv)

# basic-mv是一个mv框架解除数据源与视图控制器，视图控制器之间的耦合性。


### 特点：


    1、严密的闭包封装，用户只需关心数据代理proxy与视图控制器mediator的开发



### 快速开始：


    npm install basic-mv

### 创建数据代理

```html

    function UserProxy() {
        basic.Proxy.apply(this);
     }

```

### 创建视图控制器


```html

     function IndexMediator() {
        this.listNotificationInterests = ["test", "test1"];
        this.handleNotification = function (data) {
            switch (data.name) {
                case "test":
                    break;
                case "test1":
                    break;
            }
        };
        basic.Mediator.apply(this);
    }

```

### 如何使用：


```html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="../basic-mv/dist/basic-mv.js" type="text/javascript"></script>
        <script type="text/javascript">
            function UserProxy() {
                basic.Proxy.apply(this);
                this.getData = function () {
                    //广播消息
                    this.notifyObservers(this.getNotification("test", "getData success"));
                };
                this.getData1 = function () {
                    //广播消息
                    this.notifyObservers(this.getNotification("test1", "getData1 success"));
                };
                this.getData2 = function () {
                    //广播消息
                    this.notifyObservers(this.getNotification("test2", "getData2 success"));
                }
            }
            function IndexMediator() {
                this.listNotificationInterests = ["test", "test1"];
                this.handleNotification = function (data) {
                    switch (data.name) {
                        case "test":
                            alert("IndexMediator接到数据" + data.body);
                            this.notifyObservers(this.getNotification("test1", "im IndexMediator send notify"));
                            break;
                        case "test1":
                            alert("IndexMediator接到数据" + data.body);
                            break;
                    }
                };
                basic.Mediator.apply(this);
            }
            function Index1Mediator() {
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
                //继承
                basic.Mediator.apply(this);
            }
            window.onload = function () {
                var proxy = new UserProxy();
                var mediator = new IndexMediator();
                var mediator1 = new Index1Mediator();
                proxy.getData();
                proxy.getData1();
                proxy.getData2();
            }
        </script>
    </head>
    <body>

    </body>
    </html>


```

	