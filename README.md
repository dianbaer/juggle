# juggle

[![Build Status](https://travis-ci.org/dianbaer/juggle.svg?branch=master)](https://travis-ci.org/dianbaer/juggle)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c787bc1d8f5045d1acad4164a5388084)](https://www.codacy.com/app/232365732/juggle?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dianbaer/juggle&amp;utm_campaign=Badge_Grade)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)


## juggle是一个极简的、组件式的js框架。无依赖，完美闭包，灵活且适合渐进学习，可与任何框架整合。包含（支持冒泡的事件、Tween、MV框架、http、websocket、资源、模块）等组件，按需选择组件，不绑架开发者。


## juggle架构图及其依赖关系（深颜色的是核心组件强烈推荐）

![架构图](./juggle.png "juggle.png")

## allinone下载
```
npm install juggle-all
```

## 核心组件介绍

-------------

### 1、juggle-event（支持冒泡的事件）

**介绍**：支持冒泡的事件，可用于解除包含结构，树形结构的耦合性。支持监听事件、移除事件、派发事件、阻止冒泡、立即阻止。使用对象池减少垃圾回收。

**优秀且需要注意的特性**：

	1、支持冒泡，前提是冒泡对象有parent属性并且不为空，有isDisplayObject属性并且为true。
    2、在派发事件的回调函数内将parent设置为null，不能阻止这一次parent接到这次事件
    3、在派发事件某层级的回调函数内，移除这层级的监听或添加这层级的监听，是不会影响这次派发事件目标的改变。
    4、但是如果在某层级的回调函数内，移除上层的监听或添加上层的监听，上层本轮会受到影响。

**下载**：

```
npm install juggle-event
```

**使用场景**：开发UI组件库，封装任意组件时都可以使用。例如：juggle-http，juggle-websocket都是基于此事件，可以派发专有的自定义事件。

**示例代码**：

1、继承事件类
```js
function DisplayObj() {
	juggle.EventDispatcher.apply(this);
}
```
2、监听事件
```js
obj.addEventListener("aaa", function(event){}, this);
```
3、派发事件，派发类型为aaa，冒泡，携带数据bbb
```js
obj.dispatchEventWith("aaa", true, "bbb");
```
4、事件Demo（双击test.html即可）

[>>>>>>事件Demo](./juggle-event-test)

------------------

### 2、juggle-juggler（时间轴总控）

**介绍**：时间轴总控，支持添加动画，移除动画，每帧进行动画回调并携带与上一次调用的间隔毫秒数

**优秀且需要注意的特性**：

	1、回调中新加入的动画不能在这一次被调度，因为没有经历时间过程这是合理的
    2、回调中移除的分两种可能，已经在本次调度的无影响，没有在本次调度的取消本次调度

**下载**：

```
npm install juggle-juggler
```

**使用场景**：动画，每帧进行调用的业务逻辑，都可以使用。

**示例代码**：

1、必须实现规定的advanceTime方法
```js
function View() {
	this.advanceTime = function (time) {
	}
}
```
2、加入时间轴总控，每帧会调用advanceTime，并携带与上一次调用的间隔毫秒数
```js
juggle.jugglerManager.juggler.add(new View());
```
3、时间轴总控Demo

[>>>>>>时间轴总控Demo](./juggle-juggler-test)

-----------------

### 3、juggle-tween（缓动类）

**介绍**：缓动类，支持17种过渡模式，每帧无误差精准定位，完美的平滑过渡。支持对象池减少垃圾回收。

**优秀且需要注意的特性**：

	1、每次调用都是开始值+（终点-起点）*（经过时间/总时间），这是最稳定的，没有任何误差
    2、连续调度，每次完成时过剩的时间再次利用不浪费。

**下载**：
```
npm install juggle-tween
```
**使用场景**：需要动画过渡的都可以使用。

**示例代码**：

1、创建一个显示对象
```js
function DisplayObject(obj) {
	this.obj = obj;
	this.xValue = 0;
	this.yValue = 0;
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
	this.draw = function () {
		this.obj.style.position = "absolute";
		this.obj.style.top = this.yValue + "px";
		this.obj.style.left = this.xValue + "px";
	}
}
```	
2、使用juggle-tween进行动画过渡
```js
var display = new DisplayObject(document.getElementById("tween_div"));
display.setX(100);
display.setY(100);
tween = juggle.tweenPool.fromPool(display, 2);
tween.animate(display.getX, display.setX, 800);
tween.animate(display.getY, display.setY, 400);
juggle.jugglerManager.juggler.add(tween);
```
3、Tween的Demo（双击test.html即可）

[>>>>>>Tween的Demo](./juggle-tween-test)

4、Tween的Demo线上演示地址：

[>>>>>>Tween的Demo线上演示地址](https://www.threecss.com/juggle-tween-test/test.html)

-----------------

### 4、juggle-delayedcall（延迟回调）

**介绍**：一个绝对精准的延迟回调工具，支持设置回调间隔，回调次数（支持无限次数）。解决setInterval多次调用不精准的问题。使用对象池减少垃圾回收。

**优秀且需要注意的特性**：

	1、连续调度，每次完成时过剩的时间再次利用不浪费。调度时间间隔例如：1001毫秒，999毫秒这种模式。

**下载**：
```
npm install juggle-delayedcall
```
**使用场景**：所有需要延迟回调的业务，替代setInterval。

**示例代码**：

1、延迟回调例子，参数1延迟回调函数，每1秒回调一次，携带1111参数，重复5次后停止回调。
```js
var delayedCall = juggle.delayedCallPool.fromPool(function(arg){}, 1, "1111");
delayedCall.mRepeatCount = 5;
juggle.jugglerManager.juggler.add(delayedCall);
```

2、延迟回调Demo（双击test.html即可）

[>>>>>>延迟回调Demo](./juggle-delayedcall-test)

------------------

### 5、juggle-mv（MV框架）

**介绍**：一个MV框架解除数据源与视图控制器的耦合性，视图控制器之间的耦合性，严密的闭包封装，用户只需继承Proxy与Mediator即可开发MV模式的项目。

**下载**：
```
npm install juggle-mv
```
**使用场景**：需要与服务器进行交互的web项目。

**示例代码**：

1、继承Proxy作为数据代理，可以请求数据结果后广播消息。
```js
function UserProxy() {
	//继承
	juggle.Proxy.apply(this);
	//获取数据然后广播
	this.getData = function () {
		this.notifyObservers(this.getNotification("test", "getData success"));
	};
}
```
2、继承Mediator作为视图控制器，控制视图、调用数据源Proxy、关注数据源Proxy与视图控制器Mediator广播过来的消息并处理。
```js
function IndexMediator() {
	//关注消息
	this.listNotificationInterests = ["test"];
	//关注消息的处理
	this.handleNotification = function (data) {
		switch (data.name) {
			case "test":
				alert("IndexMediator接到数据" + data.body);
				break;
		}
	};
	//继承
	juggle.Mediator.apply(this);
}
```
3、MV框架Demo（双击test.html即可）

[>>>>>>MV框架Demo](./juggle-mv-test)

---------------------------------------

## 其他组件介绍

------
### 1、juggle-websocket（简易封装，支持自定义事件派发的websocket客户端库）

**下载**：
```
npm install juggle-websocket
```
**使用场景**：需要与服务器建立长连接，依赖服务器推送消息的web项目。

**示例代码**：

1、websocket客户端与服务器示例

[>>>>>>websocket客户端](./juggle-websocket-test)

[>>>>>>websocket服务器](https://github.com/dianbaer/grain/tree/master/grain-threadwebsocket-test)

2、anychat是一个极简纯净的websocket聊天插件，支持对接任何身份系统，嵌入方只需提供三个API即可进行实时通讯。支持个人聊天、群聊天、上下线、查看聊天记录、离线消息推送等，服务器绝对控制权的推送机制，合理的线程设计，支持mongodb存储聊天记录，天生的嵌入式支持。 

[>>>>>>anychat github地址](https://github.com/dianbaer/anychat)

[>>>>>>anychat 码云地址](https://gitee.com/dianbaer/anychat)

------

### 2、juggle-http（简易封装，通用性很好的http客户端库）

**下载**：
```
npm install juggle-http
```
**使用场景**：需要向服务器发送http请求的web项目。

**示例代码**：

1、http客户端与服务器示例

[>>>>>>http客户端](./juggle-http-test)

[>>>>>>http服务器](https://github.com/dianbaer/grain/tree/master/grain-httpserver-test)

2、anyupload是一个极度纯净的上传插件，通过简单调整就可以融入到任何项目，支持多文件上传、上传速率动态控制、真实进度监控kb/s、分块生成MD5、分块上传、MD5校验秒传、暂停、取消等。

[>>>>>>anyupload github地址](https://github.com/dianbaer/anyupload)

[>>>>>>anyupload github地址](https://gitee.com/dianbaer/anyupload)


3、startpoint是一个身份系统，提供用户、树形结构组、token等API。

[>>>>>>startpoint github地址](https://github.com/dianbaer/startpoint)

[>>>>>>startpoint github地址](https://gitee.com/dianbaer/startpoint)

-------------

### 3、juggle-resource（支持加载多资源回调的资源库）

**下载**：
```
npm install juggle-resource
```

**使用场景**：配合juggle-module使用。

**示例代码**：

1、加载资源Demo

[>>>>>>加载资源Demo](./juggle-resource-test)

--------------

### 4、juggle-module（模块库，前端模块化架构）

**下载**：
```
npm install juggle-module
```

**示例代码**：

1、模块Demo

[>>>>>>模块Demo](./juggle-module-test)

-------------------

## 更多详细介绍

[>>>>>>juggle-event详细介绍](./juggle-event)

[>>>>>>juggle-juggler详细介绍](./juggle-juggler)

[>>>>>>juggle-tween详细介绍](./juggle-tween)

[>>>>>>juggle-delayedcall详细介绍](./juggle-delayedcall)

[>>>>>>juggle-mv详细介绍](./juggle-mv)

[>>>>>>juggle-websocket详细介绍](./juggle-websocket)

[>>>>>>juggle-http详细介绍](./juggle-http)

[>>>>>>juggle-resource详细介绍](./juggle-resource)

[>>>>>>juggle-module详细介绍](./juggle-module)

## juggle地址：

[>>>>>>github](https://github.com/dianbaer/juggle)

[>>>>>>码云](https://gitee.com/dianbaer/basic)

	