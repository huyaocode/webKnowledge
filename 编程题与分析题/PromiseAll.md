# Promise.all

Promise.all 接收一个 promise 对象的数组作为参数，当这个数组里的所有 promise 对象全部变为 resolve 或 有 reject 状态出现的时候，它才会去调用 .then 方法,它们是并发执行的。

### Promise.all 简介

Promise.all(promiseArray) 方法是 Promise 对象上的静态方法，该方法的作用是将多个 Promise 对象实例包装，生成并返回一个新的 Promise 实例。

参数：promiseArray，是一个 Promise 实例数组

```js
var p1 = Promise.resolve(1),
  p2 = Promise.reject(2),
  p3 = Promise.resolve(3);
Promise.all([p1, p2, p3])
  .then(function (results) {
    //then方法不会被执行
    console.log(results);
  })
  .catch(function (e) {
    //catch方法将会被执行，输出结果为：2
    console.log(2);
  });
```

promise 数组中所有的 promise 实例都变为 resolve 的时候，该方法才会返回，并将所有结果传递 results 数组中。promise 数组中任何一个 promise 为 reject 的话，则整个 Promise.all 调用会立即终止，并返回一个 reject 的新的 promise 对象。

### 总结 promise.all 的特点

1. 接收一个 Promise 实例的数组或具有 Iterator 接口的对象，
2. 如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象
3. 如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
4. 只要有一个失败，状态就变为 rejected，返回值将直接传递给回调
   all() 的返回值也是新的 Promise 对象

### 实现 Promise.all 方法

```js
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (isArray(promises)) {
      return reject(new Error("Promises must be an array"));
    }
    var resolvedCount = 0;
    var promiseNum = promises.length;
    var resloveValue = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          resloveValue[i] = value;
          resolvedCount++;
          if (resolvedCount === promiseNum) {
            return resloveValue;
          }
        },
        (reason) => {
          return reject(reason);
        }
      );
    }
  });
}
```
