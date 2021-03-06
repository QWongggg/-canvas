// 将utils定义为window对象下的一个属性
window.utils = {};

// 在utils对象上定义捕获坐标的方法
utils.captureMouse = function(element) {
    // 定义一个名为mouse的对象
    var mouse = {x:0,y:0};
    element && element.addEventListener('mousemove', function(event) {
        var x,y;
        // 获取鼠标位于当前屏幕的位置，并作兼容处理
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = envet.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        // 将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);
    // 返回值为mouse对象
    return mouse;
}

utils.captureTouch = function (element) {
    var touch = {
        x: null,
        y: null,
        isPressed: false,
        event: null
    };
    var body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element && element.offsetLeft,
        offsetTop = element && element.offsetTop;

    // 绑定touchstart事件
    element && element.addEventListener('touchstart', event => {
        touch.isPressed = true;
        touch.event = event;
    });

    // 绑定touchend事件
    element && element.addEventListener('touchend', event => {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    });
    
    // 绑定touchmove事件
    element && element.addEventListener('touchmove', event => {
        var x, y,
            touch_event = event.touches[0];
        
        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        // 减去偏移量
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    });
    return touch;
}

// requestAnimationFrame兼容
(function(){
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (window.webkitRequestAnimationFrame||
        window.mozRequestAnimationFrame||
        window.oRequestAnimationFrame||
        window.msRequestAnimationFrame||
        function(cb){
            return window.setTimeout(cb, 1000/60);
        });
    }
}());


// class Utils {
//     constructor() {

//     }
//     captureMouse(element) {
//         // 定义一个名为mouse的对象
//         var mouse = {x:0,y:0};
//         element.addEventListener('mousemove', function(event) {
//             var x,y;
//             // 获取鼠标位于当前屏幕的位置，并作兼容处理
//             if (event.pageX || event.pageY) {
//                 x = event.pageX;
//                 y = event.pageY;
//             } else {
//                 x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//                 y = envet.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//             }
//             // 将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
//             x -= element.offsetLeft;
//             y -= element.offsetTop;
    
//             mouse.x = x;
//             mouse.y = y;
//         }, false);
//         // 返回值为mouse对象
//         return mouse;
//     }
// }
