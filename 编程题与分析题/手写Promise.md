# 手写Promise

先看看Promise是怎么用的
```js
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
}).then(value => {
  console.log(value)
})
```
在Promise的构造器中传入一个函数，这个函数有两个参数 resolve和reject，这两个参数都是Promise的回调函数，不需要自己写，在需要的时候调用就可以了，他们分别是成功的回调resolve和失败的回调reject。


### 简易版 Promise

**第一步**，先来搭建构建函数的大体框架

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn){
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []
  // 待完善 resolve 和 reject 函数
  // 待完善执行 fn 函数
}
```
 - 首先创建三个常量用于表示状态，对于经常使用的一些值应该通过常量来管理，便于开发及后期维护
 - 在函数体内部首先创建常量that，因为代码可能会异步执行，用于获取正确的this对象
 - 一开始Promise的状态是 pending
 - value 变量用于保存resolve或者reject中传入的值
 - resolvedCallbacks和rejectedCallback用于保存then中的回调，因为当执行完Promise时状态可能还是等待中，这时候应该把then中的回调保存起来用于状态改变时使用


**第二步**，完善resolve和reject函数，添加在 MyPromise 函数体内部
```js
function resolve(value) {
  if(that.state === PENDING) {
    that.state = RESOLVED
    that.value = value
    that.resolvedCallbacks.map(cb => cb(that.value))
  }
}

function reject(value) {
  if(that.state === PENDING){
    that.state = REJECTED
    that.value = value;
    that.rejectedCallbacks.map(cb => cb(that.value));
  }
}
```
 - 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
 - 将当前状态更改为对应状态，并且将传入的值赋值给 value
 - 遍历回调数组并执行


**第四步**，实现如何执行 Promise 中传入的函数了
```js
try {
  fn(resolve, reject)
} catch (e) {
  reject(e)
}
```
 - 实现很简单，执行传入的参数并且将之前两个函数当做参数传进去
 - 要注意的是，可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数



**第五步**，实现较为复杂的 then 函数。

then函数是在Promise构造器中成功状态下调用的resolve方法的回调。

then函数是可以接收两个参数的，一个是用户自定义的成功处理，另一个是用户自定义的错误处理，第二个参数可不传。

```js
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  //对传入的两个参数做判断，如果不是函数将其转为函数
  onFulfilled = 
    typeof onFulfilled === 'function'
    ? onFulfilled 
    : v => v  // onFulfilled = v => v
  onRejected = 
    typeof onRejected === 'function'
    ? onRejected
    : r => {
      throw r
    }
  
  if(that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  else if(that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  else {
    onRejected(that.value)
  }
}
```
 - 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
 - 当参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传，比如如下代码
```js
// 该代码目前在简单版中会报错
// 只是作为一个透传的例子
Promise.resolve(4).then().then((value) => console.log(value))
```
 - 接下来就是一系列判断状态的逻辑，当状态不是等待态时，就去执行相对应的函数。如果状态是等待态的话，就往回调函数中 push 函数，比如如下代码就会进入等待态的逻辑


### [pormise完整代码](./promise.js)
