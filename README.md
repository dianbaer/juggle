# threecss-c


## threecss-c.js

在开发Http项目时，更推荐C/S架构的模式。所以专门开发了Client端的JavaScript库供网页前端使用。只需引入：

	<script src="js/lib/threecss-c.js" type="text/javascript"></script>



>1、事件Event

	支持自定义事件，事件冒泡。解决包含关系、树形结构关系的解耦合问题。
	通过EventDispatcher.apply(this)语句，即可成为一个事件类，内部派发事件，外部关注事件。

>2、动画Tween

	包含时间管理器Juggler、延迟回调DelaydCall、动画Tween。
	时间间隔回调的统一管理，更加可控、可暂停。
	绝对精准化延迟回调DelaydCall和动画Tween解决了setInterval与setTimeout多次调用不精准的问题。
	多条时间线匹配，更好的解决了根据层次关系先后调用的问题。
	动画Tween的多种过渡类型算法。
	
	简单的例子：
	
		var display = new DisplayObject();
		display.DisplayObject(document.getElementById("test"));
		display.setAlpha(1);
		var tween = new Tween();
		tween.Tween(display, 1, $T.transitions.EASE_OUT_BACK);
		tween.animate(display.getX, display.setX, 900);
		tween.animate(display.getY, display.setY, 500);
		$T.jugglerManager.oneJuggler.add(tween);

>3、MV模式与消息

	数据层Proxy与视图控制层Mediator通过消息的解耦合，Proxy与Mediator多对多的关系。
	Proxy可以通过消息通知多个Mediator改变自己控制的视图，Mediator也可调用多个Proxy获取数据。
	Mediator与Mediator之间也是通过消息方式进行沟通。
	
>4、HTTP

	友好的ajax请求格式，支持POST请求携带多文件。
	支持相同类型请求可选择是否锁定，支持请求生命周期变化的消息派发。
	支持请求结果校验增加过滤器。
	
	简单的例子：
	
		var data = {
			"userName": userName,
			"userPassword": userPassword,
			'userEmail': userEmail
		};
		var sendParam = new SendParamNormal();
		sendParam.successHandle = this.demoTestSuccess;//成功回调
		sendParam.failHandle = this.demoTestFail;//失败回调（可选）
		sendParam.object = this;
		sendParam.data = data;//携带数据
		sendParam.url = $T.url.createExample;//地址
		if (userImg != null && userImg.length != 0) {
			sendParam.fileArray = userImg;//携带文件（可选）
		}
		$T.httpUtilNormal.send(sendParam);

>5、资源与模块

	为了解决html界面拆分问题，引入了资源与模块的概念。
	资源支持缓存、多资源加载回调，模块支持加载模块，卸载模块。
	
	简单的例子：
	
		$T.moduleManager.loadModule("html/top.html", document.getElementById("index_top"), 'top', $T.topMediator,data);
	
	解释：
		加载top.html这个模块，它归属ID为index_top的容器，类型为top相同类型会被自动卸载，它的控制器是$T.topMediator，
		模块加载成功后，自动将top.html加入到显示列表，携带data注入$T.topMediator.init方法，并且自动将$T.topMediator关注的消息进行注册
	
>6、WebScoket

	WebSocket解决网页端长连接通讯的问题，可以开发实时通讯，游戏等项目。
	ThreeCSS对Webscoket进行了封装，外部通过关注事件即可知道链接成功、链接失败、消息推送过来这些状态。
	
	简单的例子：
	
		1、创建链接，关注事件
		
		this.webSocketClient = new WebSocketClient();
        this.webSocketClient.WebSocketClient($T.url.chat);
        this.webSocketClient.addEventListener($T.webSocketEventType.CONNECTED, this.onConnected, this);
        this.webSocketClient.addEventListener($T.webSocketEventType.CLOSE, this.onClose, this);
		this.webSocketClient.addEventListener($T.webSocketEventType.getMessage("2"), this.onLoginChatServer, this);
		
		2、向服务器推送消息
		
		var data = {
            "wsOpCode": 5,
            "chatContent": chatContent,
            "toType": toType,
            "toTypeId": toTypeId
        };
        this.webSocketClient.send(data);

>7、对象池

	ThreeCSS大量使用了对象池的方式，大幅度降低了JavaScript虚拟机垃圾回收的频率，提高性能。
	
	
	
1、安装nodejs

2、执行npm install -g grunt-cli

	npm init
	npm install grunt --save-dev
	npm install grunt-contrib-concat --save-dev
	npm install grunt-contrib-uglify --save-dev

3、进入threecss-c 执行grunt


	