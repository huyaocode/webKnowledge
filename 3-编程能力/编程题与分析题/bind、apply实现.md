### 自封装 bind 方法

- 因为 bind 的使用方法是 某函数.bind(某对象，...剩余参数)
  - 所以需要在 Function.prototype 上进行编程
- 将传递的参数中的某对象和剩余参数使用 apply 的方式在一个回调函数中执行即可
- 要在第一层获取到被绑定函数的 this，因为要拿到那个函数用 apply

```js
/**
 * 简单版本
 */
Function.prototype.myBind = (that, ...args) => {
  const funcThis = this;
  return function (..._args) {
    return funcThis.apply(that, args.concat(_args));
  };
};
```

### 自封装一个 apply

- 首先要先原型上即 Function.prototype 上编程
- 需要拿到函数的引用， 在这里是 this
- 让 传入对象.fn = this
- 执行 传入对象.fn(传入参数)
- 返回执行结果

```js
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  let result;
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```
