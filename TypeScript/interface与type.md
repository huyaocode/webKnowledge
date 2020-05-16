# Typescript 中的 interface 和 type

## 相同点

- 都可以描述一个对象或者函数
- 都允许拓展（extends）

## 不同点

### type 可以而 interface 不行

- type 声明的方式可以定义组合类型，交叉类型，原始类型。

```js
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat
// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

- type 语句中还可以使用 typeof 获取实例的 类型进行赋值

```js
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement("div");
type B = typeof div;
```

- 其他操作

```js
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

### interface 可以而 type 不行

- interface 能够声明合并

```js
interface User {
 name: string
 age: number
}

interface User {
 sex: string
}

/*
User 接口为 {
 name: string
 age: number
 sex: string
}
*/
```

- 一个函数，如果想使用`函数名.值`的方式，只能 interface

参考：https://juejin.im/post/5c2723635188252d1d34dc7d
