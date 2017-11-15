# juggle

[![Build Status](https://travis-ci.org/dianbaer/juggle.svg?branch=master)](https://travis-ci.org/dianbaer/juggle)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c787bc1d8f5045d1acad4164a5388084)](https://www.codacy.com/app/232365732/juggle?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dianbaer/juggle&amp;utm_campaign=Badge_Grade)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)


## juggle是一个极简的、组件式的js框架。无依赖，完美闭包，灵活且适合渐进学习，可与任何框架整合。包含（支持冒泡的事件、Tween、mv框架、http、websocket、资源、模块）等组件，按需选择组件，不绑架开发者。


## juggle架构图及其依赖关系（深颜色的是核心组件强烈推荐）

![架构图](./juggle.png "juggle.png")

## allinone下载

```
npm install juggle-all
```
	

## 核心组件介绍

-------------

### 1、juggle-event（支持冒泡的事件）

**介绍**：支持冒泡的事件库，可用于解除包含结构，树形结构的耦合性。可进行监听事件、派发事件。

**注意**：

	1、支持冒泡，前提冒泡对象的parent不为空并且isDisplayObject是true
    2、在派发事件的回调函数内将parent设置为null，不能阻止这一次parent接到这次事件
    3、在派发事件某层级的回调函数内，移除这层级的监听或添加这层级的监听，是不会影响这次派发事件目标的改变的。
    4、但是如果在某层级的回调函数内，移除上层的监听或添加上层的监听，上层本轮会受到影响。

**下载**：

```
npm install juggle-event
```

**使用场景**：开发UI组件库，封装任意组件时都可以使用。例如：juggle-http，juggle-websocket都支持派发自定义事件。

**示例代码**：


>代码示例：
	
	function DisplayObj() {
		juggle.EventDispatcher.apply(this);
	}
	function DisplayObjContainer() {
		DisplayObj.apply(this);
		this.addChild = function (child) {
			child.parent = this;
		};
		this.removeChild = function (child) {
			child.parent = null;
		};
	}
	//创建DisplayObj对象
	var obj = new DisplayObj();
	//创建DisplayObjContainer对象
	var container = new DisplayObjContainer();
	//将container是obj的容器
	container.addChild(obj);
	//添加监听
	obj.addEventListener("aaa", function(event){}, this);
	container.addEventListener("aaa", function(event){},this);
	//发布事件
	obj.dispatchEventWith("aaa", true, "bbb");


>例子：


[juggle-event-test](./juggle-event-test)


[juggle-event详细介绍](./juggle-event)


### 2、动画管理Juggler


juggle-event是一个动画管理类，可以添加与移除动画。


	1、回调中新加入的动画不能在这一次被调度，因为没有经历时间过程这是合理的
	
    2、回调中移除的分两种可能，已经在本次调度的无影响，没有在本次调度的取消本次调度

>安装：

	npm install juggle-juggler


>代码示例：

	
	function View() {
		this.advanceTime = function (time) {
		}
	}
	function Movie() {
		juggle.EventDispatcher.apply(this);
		this.advanceTime = function (time) {

		}
	}
	var view = new View();
    var movie = new Movie();
	juggle.jugglerManager.juggler.add(view);
	juggle.jugglerManager.juggler.add(movie);


>例子：


[juggle-juggler-test](./juggle-juggler-test)


[juggle-juggler详细介绍](./juggle-juggler)


### 3、动画类Tween


juggle-tween是Tween类，拥有精准的动画。


	1、每次调用都是开始值+（终点-起点）*（经过时间/总时间），这是最稳定的，没有任何误差
	
    2、连续调度，如果一次完成，剩余时间再次利用不浪费


>安装：

	npm install juggle-tween
	
	
>代码示例：


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

	var display = new DisplayObject(document.getElementById("tween_div"));
	display.setAlpha(1);
	display.setX(100);
	display.setY(100);
	tween = juggle.tweenPool.fromPool(display, 2);
	tween.animate(display.getX, display.setX, 800);
	tween.animate(display.getY, display.setY, 400);
	juggle.jugglerManager.juggler.add(tween);


>例子：


[juggle-tween-test](./juggle-tween-test)

线上例子地址：

https://www.threecss.com/juggle-tween-test/test.html


[juggle-tween详细介绍](./juggle-tween)




### 4、延迟回调DelayedCall

juggle-delayedcalll是一个精准的延迟回调类。


	1、连续调度，如果一次完成，剩余时间再次利用不浪费

>安装：

	npm install juggle-delayedcall
	
	
>代码示例：
	
	function delayCallFunc(arg) {
		alert(delayedCall.isComplete());
	}

	var delayedCall = juggle.delayedCallPool.fromPool(delayCallFunc, 1, "1111");
	delayedCall.mRepeatCount = 5;
	juggle.jugglerManager.juggler.add(delayedCall);


>例子：


[juggle-delayedcall-test](./juggle-delayedcall-test)


[juggle-delayedcall详细介绍](./juggle-delayedcall)



### 5、mv框架


juggle-mv是一个mv框架解除数据源与视图控制器，视图控制器之间的耦合性。


	1、严密的闭包封装，用户只需关心数据代理proxy与视图控制器mediator的开发
	

>安装：

	npm install juggle-mv
	
	
>代码示例：

	function UserProxy() {
		juggle.Proxy.apply(this);
		this.getData = function () {
			//广播消息
			this.notifyObservers(this.getNotification("test", "getData success"));
		};
		this.getData1 = function () {
			//广播消息
			this.notifyObservers(this.getNotification("test1", "getData1 success"));
		};
	}
	function IndexMediator() {
		this.listNotificationInterests = ["test", "test1"];
		this.handleNotification = function (data) {
			switch (data.name) {
				case "test":
					alert("IndexMediator接到数据" + data.body);
					break;
				case "test1":
					alert("IndexMediator接到数据" + data.body);
					break;
			}
		};
		juggle.Mediator.apply(this);
	}
	var proxy = new UserProxy();
	var mediator = new IndexMediator();
	proxy.getData();
	proxy.getData1();


>例子：


[juggle-mv-test](./juggle-mv-test)


[juggle-mv详细介绍](./juggle-mv)




## 其他组件介绍


### 1、支持事件派发的websocket客户端


juggle-websocket是一个支持事件派发的websocket客户端


>安装：

	npm install juggle-websocket


>例子：

[juggle-websocket-test](./juggle-websocket-test)

websocket服务器（直接可用）：

https://github.com/dianbaer/grain/tree/master/grain-threadwebsocket-test


[juggle-websocket详细介绍](./juggle-websocket)


### 2、http客户端


juggle-http是可以进行事件派发的httpclient库，可以发文件


>安装：


	npm install juggle-http

	
>例子：


[juggle-http-test](./juggle-http-test)

http服务器（直接可用）：

https://github.com/dianbaer/grain/tree/master/grain-httpserver-test


[juggle-http详细介绍](./juggle-http)



### 3、resource资源


juggle-resouce是一个资源库，支持加载多资源回调


>安装：


	npm install juggle-resource


>例子：


[juggle-resource-test](./juggle-resource-test)


[juggle-resource详细介绍](./juggle-resource)


### 4、module资源


juggle-module是模块类，支持模块加载卸载


>安装：


	npm install juggle-module


>例子：


[juggle-module-test](./juggle-module-test)


[juggle-module详细介绍](./juggle-module)


### github地址：

https://github.com/dianbaer/juggle

### 码云地址：

https://gitee.com/dianbaer/basic


### 基于juggle开发的项目

anyupload是一个极度纯净的上传插件，通过简单调整就可以融入到任何项目，支持多文件上传、上传速率动态控制、真实进度监控kb/s、分块生成MD5、分块上传、MD5校验秒传、暂停、取消等。

https://github.com/dianbaer/anyupload

https://gitee.com/dianbaer/anyupload

anychat是一个极简纯净的websocket聊天插件，支持对接任何身份系统，嵌入方只需提供三个API即可进行实时通讯。支持个人聊天、群聊天、上下线、查看聊天记录、离线消息推送等，服务器绝对控制权的推送机制，合理的线程设计，支持mongodb存储聊天记录，天生的嵌入式支持。 

https://github.com/dianbaer/anychat

https://gitee.com/dianbaer/anychat


### 上传npm包

    npm pack

    npm adduser

    npm publish

	