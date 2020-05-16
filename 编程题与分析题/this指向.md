# this 指向

### 头条一面

请分别写出下面题目的答案。

```js
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};

function getName() {
  console.log(5);
}

//请写出以下输出结果：
Foo.getName(); //-> 2    Foo对象上的getName() ，这里不会是3，因为只有Foo的实例对象才会是3，Foo上面是没有3的
getName(); //-> 4    window上的getName，console.log(5)的那个函数提升后，在console.log(4)的那里被重新赋值
Foo().getName(); //-> 1    在Foo函数中，getName是全局的getName，覆盖后输出 1
getName(); //-> 1    window中getName();
new Foo.getName(); //-> 2    Foo后面不带括号而直接 '.'，那么点的优先级会比new的高，所以把 Foo.getName 作为构造函数
new Foo().getName(); //-> 3    此时是Foo的实例，原型上会有输出3这个方法
```

### 箭头函数中的 this 判断

箭头函数里面的 this 是继承它作用域父级的 this， 即声明箭头函数处的 this

```js
let a = {
  b: function () {
    console.log(this);
  },
  c: () => {
    console.log(this);
  },
};

a.b(); // a
a.c(); // window

let d = a.b;
d(); // window
```

### this 判断 下面输出为多少？

```js
var name1 = 1;

function test() {
  let name1 = "kin";
  let a = {
    name1: "jack",
    fn: () => {
      var name1 = "black";
      console.log(this.name1);
    },
  };
  return a;
}

test().fn(); // ?
```

答案： 输出 1

因为 fn 处绑定的是箭头函数，箭头函数并不创建 this，它只会从自己的作用域链的上一层继承 this。这里它的上一层是 test()，非严格模式下 test 中 this 值为 window。

- 如果在绑定 fn 的时候使用了 function，那么答案会是 'jack'
- 如果第一行的 var 改为了 let，那么答案会是 undefind， 因为 let 不会挂到 window 上
