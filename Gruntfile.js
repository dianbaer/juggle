module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\r'
            },
            dist: {
                src: [
                    'juggle-help/src/Tools.js',//无依赖
					'juggle-event/src/Event.js',//依赖juggle-help
                    'juggle-event/src/EventPool.js',//依赖Event
                    'juggle-event/src/EventDispatcher.js',//依赖juggle-help，EventPool
					'juggle-juggler/src/JugglerEventType.js',//无依赖
                    'juggle-juggler/src/Juggler.js',//依赖JugglerEventType,juggle-help
                    'juggle-juggler/src/JugglerManager.js',//依赖Juggler
					'juggle-tween/src/Transitions.js',//无依赖
                    'juggle-tween/src/Tween.js',//依赖juggle-help,juggle-event,juggle-juggler,transitions
                    'juggle-tween/src/TweenPool.js',//依赖Tween,juggle-help
					'juggle-delayedcall/src/DelayedCall.js',//依赖juggle-help,juggle-event,juggle-juggler
                    'juggle-delayedcall/src/DelayedCallPool.js',//DelayedCall,juggle-help
					'juggle-websocket/src/WebSocketEventType.js',//无依赖
                    'juggle-websocket/src/WebSocketConfig.js',//无依赖
                    'juggle-websocket/src/WebSocketClient.js',//依赖WebSocketEventType,WebSocketConfig,juggle-event
					'juggle-http/src/HttpEventType.js',//无依赖
                    'juggle-http/src/HttpClient.js',//依赖httpEventType，juggle-event
					'juggle-resource/src/ResourceEventType.js',//无依赖
                    'juggle-resource/src/Loader.js',//resourceEventType,juggle-http,juggle-event
                    'juggle-resource/src/ResourceManager.js',//依赖resourceEventType,Loader
					'juggle-mv/src/ViewManager.js',//无依赖
					'juggle-module/src/ModuleManager.js',//依赖juggle-resource
					'juggle-httpfilter/src/HttpFilter.js'//依赖juggle-http
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 默认任务
    grunt.registerTask('default', ['concat', 'uglify']);
};