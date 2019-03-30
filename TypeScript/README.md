# TypeScript
TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。

TypeScript 只会进行静态检查，编译为 js 之后，并没有什么检查的代码被插入进来。如果编译时发现有错误，就会报错，但还是会生成编译结果。

### TS优势

 - TypeScript 增加了代码的可读性和可维护性
   - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
   - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
   - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
 - TypeScript 非常包容
   - TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
   - 即使不显式的定义类型，也能够自动做出类型推论
   - 可以定义从简单到复杂的几乎一切类型
   - 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
   - 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取
 - TypeScript 拥有活跃的社区
   - 大部分第三方库都有提供给 TypeScript 的类型定义文件
 - TypeScript 的缺点
   - 有一定的学习成本
   - 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
   - 集成到构建流程需要一些工作量
   - 可能和一些库结合的不是很完美


### 数据类型

 - `boolean`
 - `number`
 - `string`
 - `undefind`
 - `list`
 - `Tuple`
 - `enum`
 - `any`
   - 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
   - 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
 - `void`
   - 可以用 void 表示没有任何返回值的函数
   - 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null


### 类型推论
TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

以下代码虽然没有指定类型，但是会在编译的时候报错：
```
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种。
```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

#### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。
```ts
function getLength(something: string | number): number {
    return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```
length 不是 string 和 number 的共有属性，只有string有，所以会报错。

联合类型的变量在被**赋值**的时候，会根据类型推论的规则推断出一个类型。推断后访问该类型没有的属性就会报错。


### 对象的类型

除了可用于[对类的一部分行为进行抽象](https://ts.xcatliu.com/advanced/class-and-interfaces.html#%E7%B1%BB%E5%AE%9E%E7%8E%B0%E6%8E%A5%E5%8F%A3)以外，也常用于对`对象的形状（Shape）`进行描述。

 - 普通接口
   - 定义的变量比接口**少了**或是**多了**一些属性是不允许的
 - 可选属性
   - 在属性后面加`?`表示该属性为可选属性
 - 任意属性
   - `[propName: string]: 类型;`
   - 注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
 - 只读属性
   - 在属性名前加`readonly`，则该属性只能在创建的时候被赋值


### 数组的类型

 - 类型 + 方括号 表示法
   - `let fibonacci: number[] = [1, 1, 2, 3, 5];`
   - `let fibonacci: (number | string)[] = [1, '1', 2, 3, 5];`

 - 数组泛型`Array<elemType>` 来表示数组
   - let fibonacci: Array<number> = [1, 1, 2, 3, 5];

 - 在数组中的`any`

   - `let list: any[] = ['yaoyao', 25, { a: 'str' }];`
 - 用接口表示数组
   - NumberArray 表示：只要 index 的类型是 number，那么值的类型必须是 number
```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

 - 类数组
   - 类数组（Array-like Object）不是数组类型，比如 `arguments`
   - 事实上常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection
```ts
function sum() {
    let args: IArguments = arguments;
}
```

### 函数的类型

 - 声明式
   - 一个函数有输入和输出，需要把输入和输出都考虑到。并且输入多余的（或者少于要求的）参数，是不被允许的
```ts
function sum(x:number, y:number): number {
  return x + y;
}
```

 - 函数表达式
   -  TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。 不要和ES6的箭头函数搞混了
```ts
let mySum : (x: number, y: number) => number
  = function (x: number, y: number): number {
    return x + y;
};
```

 - 用接口定义函数的形状
```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySerch : SearchFunc
  = function(source: string, subString: string): boolean {
    return source.search(subString) !== -1;
};
```

 - 可选参数
   - 用`?`表示可选的参数
```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
```

 - 参数默认值
   - TypeScript 会将添加了默认值的参数识别为可选参数
```ts
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
```

 - 剩余参数
   - 事实上，剩余参数是一个数组。所以我们可以用数组的类型来定义它
```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);
```

 - 重载
   - 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
   - 通常做法：重复定义了多次函数，前几次都是函数定义，最后一次是函数实现。
   - TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

### 类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型。

语法： `<类型>值` 或 `值 as 类型`，在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。