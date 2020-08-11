# 对象

## JS 中有那些内置对象

- 数据封装类对象
  - String、Array、Object、Boolean、Number
- 其他对象
  - Math、Date、RegExp、Error、Function、Arguments
- ES6 新增对象
  - Promise、Map、Set、Symbol、Proxy、Reflect

## [数组 Array 对象常用方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B)

**修改器方法**, 下面的这些方法会改变调用它们的对象自身的值：

- Array.prototype.pop()
  - 删除数组的最后一个元素，并返回这个元素。
- Array.prototype.push()
  - 在数组的末尾增加一个或多个元素，并返回数组的新长度。
-
- Array.prototype.shift()
  - 删除数组的第一个元素，并返回这个元素。
- Array.prototype.unshift()
  - 在数组的开头增加一个或多个元素，并返回数组的新长度。
-
- Array.prototype.splice()
  - 在任意的位置给数组添加或删除任意个元素。
-
- Array.prototype.reverse()
  - 颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。
- Array.prototype.sort()
  - 对数组元素进行排序，并返回当前数组。
-
- Array.prototype.fill()
  - 将数组中指定区间的所有元素的值，都替换成某个固定的值。
- Array.prototype.copyWithin()
  - 在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。

**访问方法**, 下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。

- Array.prototype.join()
  - 连接所有数组元素组成一个字符串。
-
- Array.prototype.slice([begin[, end]])
  - 抽取当前数组中的一段元素组合成一个新数组。
- Array.prototype.concat()
  - 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
-
- Array.prototype.includes()
  - 判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。
- Array.prototype.indexOf()
  - 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
- Array.prototype.lastIndexOf()
  - 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
-
- Array.prototype.toSource()
  - 返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。
- Array.prototype.toString()
  - 返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
- Array.prototype.toLocaleString()
  - 返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。

**迭代方法**

在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的 length 属性会被缓存在某个地方，所以，如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。总之，不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。

- Array.prototype.forEach()
  - 为数组中的每个元素执行一次回调函数
- Array.prototype.filter()
  - 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
-
- Array.prototype.map()
  - 返回一个由回调函数的返回值组成的新数组。
- Array.prototype.reduce()
  - 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
-
- Array.prototype.every()
  - 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
- Array.prototype.some()
  - 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。
-
- Array.prototype.find()
  - 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
- Array.prototype.findIndex()
  - 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
-
- Array.prototype.keys()
  - 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。
- Array.prototype.entries()
  - 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

## [字符串常用 API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

- String.prototype.split()
  - 通过分离字符串成字串，将字符串对象分割成字符串数组。
- String.prototype.slice(start, end)
  - 摘取一个字符串区域，返回一个新的字符串。
-
- String.prototype.substr(start, len)
  - 通过指定字符数返回在指定位置开始的字符串中的字符。
- String.prototype.substring()
  - 返回在字符串中指定两个下标之间的字符
-
- String.prototype.trim()
  - 从字符串的开始和结尾去除空格
- String.prototype.concat()
  - 连接两个字符串文本，并返回一个新的字符串。
-
- String.prototype.match()
  - 使用正则表达式与字符串相比较。
- String.prototype.search()
  - 对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。
- String.prototype.replace()
  - 被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。
-
- String.prototype.toString()
  - 返回用字符串表示的特定对象。重写 Object.prototype.toString 方法。

## Set、Map、WeakSet 和 WeakMap 的区别？

### [Set](http://es6.ruanyifeng.com/#docs/set-map#Set)

- 表示有没有，成员的值都是唯一的，没有重复的值
- 可以接受一个数组（或可迭代的数据结构）作为参数
- 注：两个对象总是不相等的

属性：

- Set.prototype.constructor：构造函数，默认就是 Set 函数。
- Set.prototype.size：返回 Set 实例的成员总数。

方法：

- add(value)：添加某个值，返回 Set 结构本身。
  - `s.add(1).add(2).add(2)`;
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
- clear()：清除所有成员，没有返回值。

遍历方法

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

### [WeakSet](http://es6.ruanyifeng.com/#docs/set-map#WeakSet)

WeakSet 结构与 Set 类似，也是不重复的值的集合。但与 Set 有几个区别：

- WeakSet 的成员**只能是对象**，而不能是其他类型的值
- WeakSet 中的对象都是弱引用
  - 如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存
  - 垃圾回收机制依赖引用计数，如果一个值的引用次数不为 0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
- WeakSet 不可遍历
  - 由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的
- WeakSet 结构中没有 clear 方法。

### [Map](http://es6.ruanyifeng.com/#docs/set-map#Map)

类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，**各种类型的值（包括对象）都可以当作 Map 的键**。

遍历方法
Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。

### [WeakMap](http://es6.ruanyifeng.com/#docs/set-map#WeakMap)

WeakMap 的设计目的在于: 有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用，而一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放被引用对象占用的内存。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。

一个典型应用**场景**是，在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除。

#### WeakMap 应用场景

##### 1. 在 DOM 对象上保存相关数据

在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除。

传统使用 jQuery 的时候，我们会通过 $.data() 方法在 DOM 对象上储存相关信息(就比如在删除按钮元素上储存帖子的 ID 信息)，jQuery 内部会使用一个对象管理 DOM 和对应的数据，当你将 DOM 元素删除，DOM 对象置为空的时候，相关联的数据并不会被删除，你必须手动执行 $.removeData() 方法才能删除掉相关联的数据，WeakMap 就可以简化这一操作：

```js
let wm = new WeakMap(),
  element = document.querySelector(".element");
wm.set(element, "data");

let value = wm.get(elemet);
console.log(value); // data

element.parentNode.removeChild(element);
element = null;
```

##### 2. 数据缓存

从上一个例子，我们也可以看出，当我们需要关联对象和数据，比如在不修改原有对象的情况下储存某些属性或者根据对象储存一些计算的值等，而又不想管理这些数据的死活时非常适合考虑使用 WeakMap。数据缓存就是一个非常好的例子：

```js
const cache = new WeakMap();

function getObjCalcData(obj) {
  if (cache.has(obj)) {
    console.log("Cached");
    return cache.get(obj);
  } else {
    console.log("Computed");
    const res = calcData(obj); // 一个依赖obj的复杂运算
    cache.set(obj, res);
    return res;
  }
}
```

##### 3. 私有属性

WeakMap 也可以被用于实现私有变量，不过在 ES6 中实现私有变量的方式有很多种，这只是其中一种：

```js
const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    privateData.set(this, { name: name, age: age });
  }

  getName() {
    return privateData.get(this).name;
  }

  getAge() {
    return privateData.get(this).age;
  }
}

export default Person;
```
