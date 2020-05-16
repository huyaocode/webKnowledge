## 下面的代码会输出什么？

```js
function A(name) {
  this.name = name || "Tom";
  this.msg = "use 'this.' set in function";
}

function B() {}
B.prototype = A;

var b = new B();

console.log(b.name);
console.log(b.msg);
```

答案是：

```
A
undefined
```

### 分析

`b.name`返回 `A`，是因为`b`上面没有`name`属性，他就会沿着原型链向上查找，然而 `b.__proto__` 为`函数A`，每一个函数都有一个属性为 name，其值是函数的名字。

```js
function abc() {
  /* 这是一个名为'abc'的函数 */
}
abc.name; // -> 'abc'
```

`b.msg` 为什么是`undefined`哪？ 因为`b.__proto__` 是 `函数A`，那怎么修改才能拿到`msg`哪？

```js
B.prototype = new A();
```

修改后的输出：

```
Tom
VM731:12 use 'this.' set in function
```
