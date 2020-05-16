# 手写 Promise

先看看 Promise 是怎么用的

```js
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log("第一个 resolve");
    resolve(1);
  }, 1000);
})
  .then((res) => {
    // 返回一个Promise对象
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("第二个 resolve");
        resolve(res + 2);
      }, 2000);
    });
  })
  .then((res) => {
    console.log(res);
  });
```

文章： [Promise 实现原理](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)

这篇文章是我在掘金上找到一篇高赞，但是很多地方没搞懂，比如 .then 函数直接返回一个 新的 Promise 对象，但是这里面用一个数组来存储即将调用的 then 函数，但调试发现这个数组（\_fulfilledQueues）最多只含一个函数。github 上有 es6-promise 的 源码，但实话写的很复杂。

// TODO- 等我空了好好理一理逻辑

## [pormise 完整代码](./promise.js)
