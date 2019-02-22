# NodeJS

## NodeJS 特点

 - 非阻塞式的异步I/O
   - Node.js中采用了非阻塞型I/O机制，因此在执行了访问文件的代码之后，Nodejs不会阻塞在那里等待文件获取完成，而是把这件事交给底层操作系统，使用回调函数的方式来处理异步的IO，立即转而执行其它的代码，
 - 事件轮询
   - Nodejs接收到的事件会放到事件队列中，而不是立即执行它，当NodeJS当前代码执行完后他会检查事件队列中是否有事件，如果有，他会取出来依次执行
 - 单线程
   - Node.js不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞I/O、事件驱动机制，让Node.js程序宏观上也是并行的
   - 优点：不会死锁、不用像多线程那样处处在意同步问题、没有线程切换带来的性能上的开销
   - 缺点：多核CPU需单独开子线程、错误会使得整个应用退出、大量计算会占用CPU从而无法调用异步I/O
 - 擅长I/O密集型
   - 主要体现在Node利用事件轮询的方式处理事件，而不是单开一个线程来为每一个请求服务
 - 不擅长CPU密集型业务
   - 由于Node单线程，如果长时间运行计算将导致CPU不能释放，使得后续I/O无法发起。（解决办法是分解大型运算为多个小任务，不阻塞I/O发起）


### global对象
与在浏览器端不同，浏览器端将希望全局访问的对象挂到window上，而nodejs则将希望全局访问的对象挂到global对象上

 - CommonJS
 - Buffer、process、console
 - timer定时器相关

### setImmediate()、setTimeout(fn, 0) 与 process.nextTick()
两个都是传入一个回调函数，当同步事件执行完之后马上执行。

执行顺序依次是：
 - process.nextTick()
   - 将回调函数加入到 当前执行栈的尾部，任务队列之前
 - setTimeout(fn, 0)
   - 回调函数加入到 任务队列尾部。即使是0，也会又4ms的延时
 - setImmediate()
   - 将回调函数插入到任务队列的最末尾，也不会造成阻塞，但不妨碍其他的异步事件


```js
setImmediate(() => {
  console.log('setImmediate');
})

setTimeout(() => {
  console.log('setImmediate');
}, 0)

process.nextTick(() => {
  console.log('next');
})
```
