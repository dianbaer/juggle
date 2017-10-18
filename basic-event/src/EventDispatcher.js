(function (window) {
    if (!window.basic) window.basic = {};
    var eventPool = window.basic.eventPool;
    var tools = window.basic.tools;
    var sBubbleChains = [];
    var functionMapping = [];
    /**
     * EventDispatcher.apply(this);继承此类
     * 支持冒泡，前提冒泡对象的parent不为空并且isDisplayObject是true
     * 在派发事件的回调函数内将parent设置为null，不能阻止这一次parent接到这次事件
     * 在派发事件某层级的回调函数内，移除这层级的监听或添加这层级的监听，是不会影响这次派发事件目标的改变的。
     * 靠长度阻止addEventListener，靠重新创建数组阻止removeEventListener
     * 但是如果在某层级的回调函数内，移除上层的监听或添加上层的监听，上层本轮会受到影响。
     * @constructor
     */
    var EventDispatcher = function () {
        this.mEventListeners = null;
        this.isEventDispatcher = true;
        /**
         * 动态创建，同一函数不能重复添加某类型监听（无回调）
         * @param type
         * @param listener
         * @param parent
         */
        this.addEventListener = function (type, listener, parent) {
            if (tools.isNull(this.mEventListeners))
                this.mEventListeners = [];
            var listeners = this.mEventListeners[type];
            if (tools.isNull(listeners)) {
                this.mEventListeners[type] = [listener];
                functionMapping[listener] = parent;
            } else if (tools.indexOf(listeners, listener) === -1) {
                listeners.push(listener);
                functionMapping[listener] = parent;
            }
        };
        /**
         * 移除监听，临时数组能够阻止派发事件回调函数移除事件带来的本轮影响（无回调）
         * @param type
         * @param listener
         */
        this.removeEventListener = function (type, listener) {
            if (this.mEventListeners) {
                var listeners = this.mEventListeners[type];
                var numListeners = listeners ? listeners.length : 0;
                if (numListeners > 0) {
                    var index = 0;
                    var restListeners = [];
                    for (var i = 0; i < numListeners; ++i) {
                        var otherListener = listeners[i];
                        if (otherListener !== listener)
                            restListeners[index++] = otherListener;
                    }
                    this.mEventListeners[type] = restListeners;
                }
            }
        };
        /**
         * 移除某类型监听，传空则移除所有监听（无回调）
         * @param type
         */
        this.removeEventListeners = function (type) {
            if (type && this.mEventListeners)
                delete this.mEventListeners[type];
            else
                this.mEventListeners = null;
        };
        /**
         * 派发事件
         * @param event
         */
        this.dispatchEvent = function (event) {
            var bubbles = event.mBubbles;
            //不冒泡并且无监听或者没有此类型监听，返回
            if (!bubbles && (tools.isNull(this.mEventListeners) || !(event.mType in this.mEventListeners)))
                return;
            //mTarget参数保留，没意义
            var previousTarget = event.mTarget;
            // 设置目标
            event.mTarget = this;
            // 冒泡并且是显示对象
            if (bubbles && this.isDisplayObject)
                this.bubbleEvent(event);
            else
                this.invokeEvent(event);
            if (previousTarget)
                event.mTarget = previousTarget;
        };
        /**
         * 回调，回调前确认长度和移除事件函数中重新创建数组意义非凡
         * @param event
         * @returns {*}
         */
        this.invokeEvent = function (event) {
            var listeners = this.mEventListeners ? this.mEventListeners[event.mType] : null;
            var numListeners = tools.isNull(listeners) ? 0 : listeners.length;
            if (numListeners) {
                // mCurrentTarget当前接到事件的对象
                event.mCurrentTarget = this;
                for (var i = 0; i < numListeners; ++i) {
                    var listener = listeners[i];
                    var numArgs = listener.length;
                    if (numArgs === 0)
                        listener.call(functionMapping[listener]);
                    else if (numArgs === 1)
                        listener.call(functionMapping[listener], event);
                    else
                        listener.call(functionMapping[listener], event, event.mData);
                    //立即阻止事件派发
                    if (event.mStopsImmediatePropagation) {
                        return true;
                    }
                }
                //是否阻止冒泡
                return event.mStopsPropagation;
            } else {
                return false;
            }
        };
        /**
         * 使用了sBubbleChains数组池，减少垃圾回收
         * 提前将冒泡数组确认存入数组，意义非凡
         * @param event
         */
        this.bubbleEvent = function (event) {
            var chain;
            var element = this;
            var length = 1;
            if (sBubbleChains.length > 0) {
                chain = sBubbleChains.pop();
                chain[0] = element;
            } else
                chain = [element];
            while (!tools.isNull(element = element.parent))
                chain[length++] = element;
            for (var i = 0; i < length; ++i) {
                var stopPropagation = chain[i].invokeEvent(event);
                if (stopPropagation)
                    break;
            }
            chain.length = 0;
            sBubbleChains.push(chain);
        };
        /**
         * 派发事件使用对象池
         * @param type
         * @param bubbles
         * @param data
         */
        this.dispatchEventWith = function (type, bubbles, data) {
            if (tools.isNull(bubbles)) {
                bubbles = false;
            }
            if (tools.isNull(data)) {
                data = null;
            }
            //如果冒泡或者自己关注这个事件了
            if (bubbles || this.hasEventListener(type)) {
                var event = eventPool.fromPool(type, bubbles, data);
                this.dispatchEvent(event);
                eventPool.toPool(event);
            }
        };
        /**
         * 是否关注这个事件
         * @param type
         * @returns {boolean}
         */
        this.hasEventListener = function (type) {
            var listeners = this.mEventListeners ? this.mEventListeners[type] : null;
            return listeners ? listeners.length !== 0 : false;
        }
    };
    window.basic.EventDispatcher = EventDispatcher;
})(window);
