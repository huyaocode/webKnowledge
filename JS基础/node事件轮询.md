# 事件轮询

原文链接： [浏览器与 Node 的事件循环(Event Loop)有何区别?](https://github.com/ljianshu/Blog/issues/54)

本文将会介绍 JS 实现异步的原理，并且了解了在浏览器和 Node 中 Event Loop 其实是不相同的。

## 一、线程与进程

---

### 1.概念

我们经常说 JS 是单线程执行的，指的是一个进程里只有一个主线程，那到底什么是线程？什么是进程？

官方的说法是：**进程是 CPU 资源分配的最小单位；线程是 CPU 调度的最小单位**。这两句话并不好理解，我们先来看张图：  
![](https://camo.githubusercontent.com/0194774edbffee2453bf37a17e92b325db680867/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f392f313638333333633134633835643739343f773d34343326683d31363226663d706e6726733d3239343733)

- 进程好比图中的工厂，有单独的专属自己的工厂资源。
- 线程好比图中的工人，多个工人在一个工厂中协作工作，工厂与工人是 1:n 的关系。也就是说**一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线**；
- 工厂的空间是工人们共享的，这象征**一个进程的内存空间是共享的，每个线程都可用这些共享内存**。
- 多个工厂之间独立存在。

### 2.多进程与多线程

- 多进程：在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。
- 多线程：程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

以 Chrome 浏览器中为例，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程（下文会详细介绍），比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。

## 二、浏览器内核

---

简单来说浏览器内核是通过取得页面内容、整理信息（应用 CSS）、计算和组合最终输出可视化的图像结果，通常也被称为渲染引擎。

浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- GUI 渲染线程
- JavaScript 引擎线程
- 定时触发器线程
- 事件触发线程
- 异步 http 请求线程

### 1.GUI 渲染线程

- 主要负责页面的渲染，解析 HTML、CSS，构建 DOM 树，布局和绘制等。
- 当界面需要重绘或者由于某种操作引发回流时，将执行该线程。
- 该线程与 JS 引擎线程互斥，当执行 JS 引擎线程时，GUI 渲染会被挂起，当任务队列空闲时，主线程才会去执行 GUI 渲染。

### 2.JS 引擎线程

- 该线程当然是主要负责处理 JavaScript 脚本，执行代码。
- 也是主要负责执行准备好待执行的事件，即定时器计数结束，或者异步请求成功并正确返回时，将依次进入任务队列，等待 JS 引擎线程的执行。
- 当然，该线程与 GUI 渲染线程互斥，当 JS 引擎线程执行 JavaScript 脚本时间过长，将导致页面渲染的阻塞。

### 3.定时器触发线程

- 负责执行异步定时器一类的函数的线程，如： setTimeout，setInterval。
- 主线程依次执行代码时，遇到定时器，会将定时器交给该线程处理，当计数完毕后，事件触发线程会将计数完毕后的事件加入到任务队列的尾部，等待 JS 引擎线程执行。

### 4.事件触发线程

- 主要负责将准备好的事件交给 JS 引擎线程执行。

比如 setTimeout 定时器计数结束， ajax 等异步请求成功并触发回调函数，或者用户触发点击事件时，该线程会将整装待发的事件依次加入到任务队列的队尾，等待 JS 引擎线程的执行。

### 5.异步 http 请求线程

- 负责执行异步请求一类的函数的线程，如： Promise，axios，ajax 等。
- 主线程依次执行代码时，遇到异步请求，会将函数交给该线程处理，当监听到状态码变更，如果有回调函数，事件触发线程会将回调函数加入到任务队列的尾部，等待 JS 引擎线程执行。

## 三、浏览器中的 Event Loop

---

### 1.Micro-Task 与 Macro-Task

浏览器端事件循环中的异步队列有两种：macro（宏任务）队列和 micro（微任务）队列。**宏任务队列可以有多个，微任务队列只有一个**。

- 常见的 macro-task 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。
- 常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5 新特性) 等。

### 2.Event Loop 过程解析

一个完整的 Event Loop 过程，可以概括为以下阶段：

![](https://camo.githubusercontent.com/875c5b741e008b6cfbf92958bce1819f6cb51770/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31302f313638333836333633333538363937343f773d33393426683d34343926663d706e6726733d3838343433)

- 一开始执行栈空,我们可以把**执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。

- 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。

- 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：当 macro-task 出队时，任务是**一个一个**执行的；而 micro-task 出队时，任务是**一队一队**执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。

- **执行渲染操作，更新界面**

- 检查是否存在 Web worker 任务，如果有，则对其进行处理

- 上述过程循环往复，直到两个队列都清空

我们总结一下，每一次循环都是一个这样的过程：

![](https://camo.githubusercontent.com/877fe5d0b39d2696b12844b04f3d134cc9f957b1/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31302f313638333837376261396161623035363f773d36323826683d31333226663d706e6726733d3530303238)

**当某个宏任务执行完后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。**

接下来我们看道例子来介绍上面流程：

```js
Promise.resolve().then(() => {
  console.log("Promise1");
  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);
});
setTimeout(() => {
  console.log("setTimeout1");
  Promise.resolve().then(() => {
    console.log("Promise2");
  });
}, 0);
```

最后输出结果是 Promise1，setTimeout1，Promise2，setTimeout2

- 一开始执行栈的同步任务（这属于宏任务）执行完毕，会去查看是否有微任务队列，上题中存在(有且只有一个)，然后执行微任务队列中的所有任务输出 Promise1，同时会生成一个宏任务 setTimeout2
- 然后去查看宏任务队列，宏任务 setTimeout1 在 setTimeout2 之前，先执行宏任务 setTimeout1，输出 setTimeout1
- 在执行宏任务 setTimeout1 时会生成微任务 Promise2 ，放入微任务队列中，接着先去清空微任务队列中的所有任务，输出 Promise2
- 清空完微任务队列中的所有任务后，就又会去宏任务队列取一个，这回执行的是 setTimeout2

## 四、Node 中的 Event Loop

---

### 1.Node 简介

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 libuv，libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现（下文会详细介绍）。

![](https://camo.githubusercontent.com/58779606d55020cd7c815402ccdaea48dcd94aec/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31312f313638336438313637346630373665623f773d35343326683d32323326663d706e6726733d3831373535)

- V8 引擎解析 JavaScript 脚本。
- 解析后的代码，调用 Node API。
- libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
- V8 引擎再将结果返回给用户。

### 2.六个阶段

其中 libuv 引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

![](https://camo.githubusercontent.com/992acfd5750f98c9a56a9a96e95111bdf7cc7669/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343162643938363063316565393f773d33353926683d33333126663d706e6726733d3130353037)

从上图中，大致看出 node 中的事件循环的顺序：

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O 事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）...

- timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare 阶段：仅 node 内部使用
- poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
- check 阶段：执行 setImmediate() 的回调
- close callbacks 阶段：执行 socket 的 close 事件回调

注意：**上面六个阶段都不包括 process.nextTick()**(下文会介绍)

接下去我们详细介绍`timers`、`poll`、`check`这 3 个阶段，因为日常开发中的绝大部分异步任务都是在这 3 个阶段处理的。

#### (1) timer

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。  
同样，**在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**。

#### (2) poll

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情

1.回到 timer 阶段执行回调

2.执行 I/O 回调

并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
  - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
  - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

#### (3) check 阶段

setImmediate()的回调会被加入 check 队列中，从 event loop 的阶段图可以知道，check 阶段的执行顺序在 poll 阶段之后。  
我们先来看个例子:

    console.log('start')
    setTimeout(() => {
      console.log('timer1')
      Promise.resolve().then(function() {
        console.log('promise1')
      })
    }, 0)
    setTimeout(() => {
      console.log('timer2')
      Promise.resolve().then(function() {
        console.log('promise2')
      })
    }, 0)
    Promise.resolve().then(function() {
      console.log('promise3')
    })
    console.log('end')
    //start=>end=>promise3=>timer1=>timer2=>promise1=>promise2

- 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出 start end，并将 2 个 timer 依次放入 timer 队列）,会先去执行微任务（**这点跟浏览器端的一样**），所以打印出 promise3
- 然后进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；这点跟浏览器端相差比较大，**timers 阶段有几个 setTimeout/setInterval 都会依次执行**，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于 Node 与浏览器的 Event Loop 差异，下文还会详细介绍）。

### 3.Micro-Task 与 Macro-Task

Node 端事件循环中的异步队列也是这两种：macro（宏任务）队列和 micro（微任务）队列。

- 常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作等。
- 常见的 micro-task 比如: process.nextTick、new Promise().then(回调)等。

### 4.注意点

#### (1) setTimeout 和 setImmediate

二者非常相似，区别主要在于调用时机不同。

- setImmediate 设计在 poll 阶段完成时执行，即 check 阶段；
- setTimeout 设计在 poll 阶段为空闲时，且设定时间到达后执行，但它在 timer 阶段执行

  setTimeout(function timeout () {
  console.log('timeout');
  },0);
  setImmediate(function immediate () {
  console.log('immediate');
  });

* 对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
* 首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的  
  进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
* 如果准备时间花费小于 1ms，那么就是 setImmediate 回调先执行了

但当二者在异步 i/o callback 内部调用时，总是先执行 setImmediate，再执行 setTimeout

    const fs = require('fs')
    fs.readFile(__filename, () => {
        setTimeout(() => {
            console.log('timeout');
        }, 0)
        setImmediate(() => {
            console.log('immediate')
        })
    })
    // immediate
    // timeout

在上述代码中，setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。

#### (2) process.nextTick

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

    setTimeout(() => {
     console.log('timer1')
     Promise.resolve().then(function() {
       console.log('promise1')
     })
    }, 0)
    process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
       process.nextTick(() => {
         console.log('nextTick')
         process.nextTick(() => {
           console.log('nextTick')
         })
       })
     })
    })
    // nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1

## 五、Node 与浏览器的 Event Loop 差异

---

**浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务**。  
![](https://camo.githubusercontent.com/71b607cd363565c5d61299d31d9fd72b889de645/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343162616431636461373431663f773d3130353126683d33343426663d706e6726733d3932363835)

接下我们通过一个例子来说明两者区别：

    setTimeout(()=>{
        console.log('timer1')
        Promise.resolve().then(function() {
            console.log('promise1')
        })
    }, 0)
    setTimeout(()=>{
        console.log('timer2')
        Promise.resolve().then(function() {
            console.log('promise2')
        })
    }, 0)

浏览器端运行结果：`timer1=>promise1=>timer2=>promise2`

浏览器端的处理过程如下：

![](https://camo.githubusercontent.com/b325e476f0336804b8bdbcd7e4e3674a52dfbd80/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343164363339326538663533373f773d36313126683d33343126663d67696626733d373232393739)

Node 端运行结果分两种情况：

- 如果是 node11 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval 和 setImmediate)就立刻执行微任务队列，这就跟浏览器端运行一致，最后的结果为`timer1=>promise1=>timer2=>promise2`
- 如果是 node10 及其之前版本：要看第一个定时器执行完，第二个定时器是否在完成队列中。

  - 如果是第二个定时器还未在完成队列中，最后的结果为`timer1=>promise1=>timer2=>promise2`
  - 如果是第二个定时器已经在完成队列中，则最后的结果为`timer1=>timer2=>promise1=>promise2`(下文过程解释基于这种情况下)

  1.全局脚本（main()）执行，将 2 个 timer 依次放入 timer 队列，main()执行完毕，调用栈空闲，任务队列开始执行；

  2.首先进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise1.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；

  3.至此，timer 阶段执行结束，event loop 进入下一个阶段之前，执行 microtask 队列的所有任务，依次打印 promise1、promise2

Node 端的处理过程如下：  
![](https://camo.githubusercontent.com/34b3491060826045c67bd57c6dcf97222620a722/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343164356638353436383034373f773d35393826683d33333326663d67696626733d343637363635)

## 六、总结

---

浏览器和 Node 环境下，microtask 任务队列的执行时机不同

- Node 端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

## 后记

文章于 2019.1.16 晚，对最后一个例子在 node 运行结果，重新修改！再次特别感谢[zy445566](https://juejin.im/user/59c335e95188254f531d0b51)和[BuptStEve](https://github.com/BuptStEve)的精彩点评，**由于 node 版本更新到 11，Event Loop 运行原理发生了变化，一旦执行一个阶段里的一个宏任务(setTimeout,setInterval 和 setImmediate)就立刻执行微任务队列，这点就跟浏览器端一致**。

## 参考文章

- [浏览器进程？线程？傻傻分不清楚！](https://imweb.io/topic/58e3bfa845e5c13468f567d5)
- [事件循环机制的那些事](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651555331&idx=1&sn=5a063db73329a9d8ea5c38d8eeb50741&chksm=802551c2b752d8d4020514337f9987cc6611ba878525c45507cbb9ceb52b92e060f50e76c48d&mpshare=1&scene=1&srcid=1115P2jpgUGueMlTaRe9UFYu#rd)
- [前端性能优化原理与实践](https://juejin.im/book/5b936540f265da0a9624b04b)
- [前端面试之道](https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5be04a8e6fb9a04a072fd2cd#heading-3)
- [深入理解 js 事件循环机制（Node.js 篇）](http://lynnelv.github.io/js-event-loop-nodejs)
- [详解 JavaScript 中的 Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)
- [event-loop-timers-and-nexttick](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [timers: run nextTicks after each immediate and timer](https://github.com/nodejs/node/pull/22842)
