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
   - 合并了不同类型的对象的数组
 - `enum`
   - 用于取值被限定在一定范围内的场景
   - 未手动赋值的枚举项会接着上一个枚举项递增
   - 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
   - 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
   - 常数枚举
     - 是使用 const enum 定义的枚举类型，不能包含计算成员
   - 外部枚举
     - 使用 declare enum 定义的枚举类型
     - 外部枚举与声明语句一样，常出现在声明文件中
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
```ts
// 获取长度例子：
function getLength(something: string|number): number {
  if((<string>something).length) {  //可能是number，所以断言
    return (<string>something).length
  } else {
    return something.toString().length;
  }
}
```

注意： 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的


### 声明文件
通常我们会把声明语句放到一个单独的文件中，声明文件必需以 `.d.ts` 为后缀。
```ts
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

更推荐的是使用 `@types` 统一管理第三方库的声明文件。

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：`npm install @types/jquery --save-dev`

可以在[这个页面](https://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

#### 书写声明文件

 - 以`npm install @types/xxx --save-dev`安装的，则不需要任何配置。
 - 如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下
 - 如果没有生效，可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件
 - 语法
   - declare var/let/const 
     - 声明全局变量，一般用const
   - declare function 
     - 声明全局方法的**类型**
   - declare class 
     - 声明全局类，只定义不实现
   - declare enum 
     - 声明全局枚举类型
   - declare namespace 
     - 它用来表示全局变量是一个对象，包含很多子属性。
     - 可嵌套定义
   - interface 和 type
     - 声明全局类型
 - 防止命名冲突
   - 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故应该将他们放到 namespace 下。在使用这个 interface 的时候，也应该加上 命名空间 前缀了
 - npm 包
   - 已存在配置
     - 与该 npm 包绑定在一起。
     - 发布到了 `@types` 里。
   - 自己为它写声明文件
     - 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。
   - `export`
     - 在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。


### 内置对象

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

在 [TypeScript 核心库](https://github.com/Microsoft/TypeScript/tree/master/src/lib)的定义文件中定义了JS的内置对象。


### 类型别名
类型别名用来给一个类型起个新名字。类型别名常用于联合类型。

### 字符串字面量类型
类型别名与字符串字面量类型都是使用 type 进行定义。

### 类
 - 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
 - 对象（Object）：类的实例，通过 new 生成
 - 面向对象（OOP）的三大特性：封装、继承、多态
 - 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
 - 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
 - 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。
 - 存取器（getter & setter）：用以改变属性的读取和赋值行为
 - 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
 - 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
 - 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

#### TS中的类

 - `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
 - `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
 - `protected` 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

#### 抽象类
`abstract` 用于定义抽象类和其中的抽象方法。
 - 抽象类是不允许被实例化
 - 抽象类中的抽象方法必须被子类实现


### 类与接口
有时候**不同类之间可以有一些共有的特性，这时候就把特性提取成接口（interfaces）**，用 implements 关键字来实现。 

 - 一个类可实现多个接口
 - 接口与接口之间可以是继承关系
 - 接口也可以继承类
 - 混合类型（有时候，一个函数还可以有自己的属性和方法）


### 泛型
在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。
```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x']
```

定义泛型的时候，可以一次定义多个类型参数：
```ts
function swap<T, U> (tuple:[T, U]) : [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

 - 泛型约束
   - 即函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，这时，我们可以对泛型进行约束。**即让泛型继承一个接口**
   - 多个类型参数之间也可以相互约束，如下例：其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
 - 泛型接口
   - 在使用泛型接口的时候，需要定义泛型的类型
 - 泛型类
 - 泛型参数的默认类型
   - 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。


### 声明合并
如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型。
```ts
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}
```
相当于：
```ts
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```