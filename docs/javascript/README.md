---
sidebar: auto
---

# JavaScript

## macrotasks VS microtasks

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