---
sidebar: auto
---

# JavaScript

## macrotasks vs microtasks

macrotask 就是我们常说的任务队列(task queue)。

microtasks 的定义如下：

> Microtasks are usually scheduled for things that should happen straight after the currently executing script, such as reacting to a batch of actions, or to make something async without taking the penalty of a whole new task. The microtask queue is processed after callbacks as long as no other JavaScript is mid-execution, and at the end of each task. Any additional microtasks queued during microtasks are added to the end of the queue and also processed. Microtasks include mutation observer callbacks, and as in the above example, promise callbacks.

通俗的讲，microtasks 的作用是用来调度应在当前执行的脚本执行结束后立即执行的任务。例如响应事件、或者异步操作，以避免付出额外的一个 task 的费用。

### 场景划分

macrotasks:

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O
- UI rendering

microtasks:

- process.nextTick
- Promises
- Object.observe
- MutationObserver

## 事件循环

Event loop 事件循环机制如下：

- An event loop has one or more task queues.(task queue is macrotask queue)
- Each event loop has a microtask queue.
- task queue = macrotask queue != microtask queue
- a task may be pushed into macrotask queue, or microtask queue
- when a task is pushed into a queue(micro/macro), we mean preparing work is finished, so the task can be executed now.

JavaScript 执行顺序可以简要总结如下：

> 开始 -> 取 task queue 第一个 task 执行 -> 取 microtask 全部任务依次执行 -> 取 task queue 下一个任务执行 -> 再次取出 microtasks 全部任务执行 -> ...

## 实现持续的动画效果

```javascript
// 兼容性处理
window.requestAnimationFrame = (function() {
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000 / 60) };
})();

function animate(time) {
  document.getElementById("animated").style.left =
    (time - animationStartTime) % 2000 / 4 + "px";
  requestId = window.requestAnimationFrame(animate);
}

function start() {
  requestId = window.requestAnimationFrame(animate);
}

function stop() {
  if (requestId) window.cancelAnimationFrame(requestId);
  requestId = 0;
}
```

## 作用域链

JavaScript 是基于 `词法作用域` 的语言。全局变量在程序中始终都是有定义的。局部变量在声明它的函数体内及其所嵌套的函数内始终是有定义的。

每一段 JavaScript 代码都有一个与之关联的作用域链（scope chain）。这个作用域链是一个对象列表或者链表，定义了这段代码 “作用域中” 的变量。

当定义一个函数时，它实际上保存一个作用域链。当调用这个函数时，它创建一个新的对象来存储它的局部变量，并将这个对象添加至保存的那个作用域链上，同时创建一个新的更长的表示函数调用作用域的 “链”。对于嵌套函数来讲，事情变得更加有趣，每次调用外部函数时，内部函数又会重新定义一遍。因为每次调用外部函数的时候，作用域链都是不同的。

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

## 闭包

函数定义时的作用域链到函数执行时依然有效。

闭包就是由函数创造的一个词法作用域，里面创建的变量被引用后，可以在这个词法环境之外自由使用。

闭包通常用来创建内部变量，使得这些变量不能被外部随意修改，同时又可以通过指定的函数接口来操作。

闭包本质还是函数，只不过这个函数绑定了上下文环境（函数内部引用的所有变量）。

闭包的特点很鲜明，闭包内，变量无法释放，无法被直接访问；闭包可以被延迟执行。所以可以用它来做一些事情：

- 管理私有变量和私有方法，将对变量（状态）的变化封装在安全的环境中
- 将代码封装成一个闭包形式，等待时机成熟的时候再使用，比如实现柯里化和反柯里化
- 需要注意的，由于闭包内的部分资源无法自动释放，容易造成内存泄露

## 继承 & 原型链

Javascript 规定，每一个构造函数都有一个 prototype 属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。所有实例对象需要共享的属性和方法，直接定义在 prototype 对象上；那些不需要共享的属性和方法，就放在构造函数里面。

由于所有的实例对象共享同一个 prototype 对象，那么从外界看起来，prototype 对象就好像是实例对象的原型，而实例对象则好像”继承”了 prototype 对象一样。

Javascript 继承机制的设计思想： `constructor + prototype`。

在默认情况下，所有的 prototype 对象都会自动获得一个 constructor（构造函数）属性，这个属性（是一个指针）指向 prototype 属性所在的函数。

> Person.prototype.constructor == Person

实例对象一旦创建，将自动引用 prototype 对象的属性和方法。

如果试图引用实例对象的某个属性，会首先在对象内部寻找该属性，如果找不到，会沿着该对象的原型（instance.prototype）继续寻找。

祭上一张经典图片：

![prototype](./prototype.jpeg)

- Function 本身就是函数，`Function.__proto__` 是标准的内置对象 `Function.prototype`。`Function.prototype.__proto__` 是标准的内置对象 `Object.prototype`。
- 对象的 `__proto__`，指向自己构造函数的 prototype。

> `Object.prototype.__proto__ === null`，说明原型链到 `Object.prototype` 终止。

`instanceof` 用于确定实例和原型之间的关系。

ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

## call vs apply

> fun.call(thisArg, arg1, arg2, ...)

> func.apply(thisArg, [argsArray])

call() 方法的作用和 apply() 方法类似，只有一个区别，就是 call() 方法接受的是若干个参数的列表，而 apply() 方法接受的是一个包含多个参数的数组。

## .3 - .2 == .2 - .1 ?

JavaScript  采用了 IEEE-754 浮点数表示法，是一种 `二进制表示法`，可以精确地表示分数。

我们常用的分数都是十进制分数，二进制浮点数表示法并不能精确标识类似 0.1 这样简单的数字。

## XMLHttpRequest -> AJAX

```javascript
function loadXMLDoc()
{
  var xmlhttp;
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // success: xmlhttp.responseText;
    }
  }

  xmlhttp.open("GET", "/ajax/demo_get.asp", true);
  xmlhttp.send();
}
```

每当 readyState 改变时，就会触发 onreadystatechange 事件。

readyState 属性存有 XMLHttpRequest 的状态信息。

下面是 XMLHttpRequest 对象的三个重要的属性：

- `onreadystatechange` 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数
- `readyState `存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。

  0: 请求未初始化；1: 服务器连接已建立；2: 请求已接收；3: 请求处理中；4: 请求已完成，且响应已就绪

- `status`	

  200: "OK"；404: 未找到页面

## require/exports 和 import/export 区别

- CommonJS 还是 ES6 Module 输出都可以看成是一个具备多个属性或者方法的对象；
- default 是 ES6 Module 所独有的关键字，export default fs 输出默认的接口对象，import fs from 'fs' 可直接导入这个对象；
- ES6 Module 中导入模块的属性或者方法时传的是值引用，包括基础类型；而 CommonJS 则是普通的值拷贝。
- require 是动态加载，import 是静态加载，从底层的运行来讲，require 是在程序运行的时候去解析，而 import 是在编译的时候去做解析请求包
- require 是请求整个包对象而 import 是只请求模块中需要的请求的部分

