## 函数式编程 compose

实现以下功能：

```js
compose([a, b, c])('参数')
=>
a( b( c('参数') ) )
```

```js
function compose(funcs) {
  var len = funcs.length;
  var index = len - 1;

  for (let i = 0; i < len; i++) {
    if (typeof funcs[i] !== "function") {
      throw new TypeError("Expected function");
    }
  }

  return function (...args) {
    let result = funcs[index](...args); // 第一次
    while (--index >= 0) {
      result = funcs[index](result);
    }
    return result;
  };
}
```

测试：

```js
function a(str) {
  return `a ${str}`;
}
function b(str) {
  return `b ${str}`;
}
function c(str) {
  return `c ${str}`;
}

const abc = compose([a, b, c]);
abc("huyao");
```
