[React性能优化](https://segmentfault.com/a/1190000006254212)

[React进阶—性能优化](https://segmentfault.com/a/1190000008925295)


### 为什么使用Virtual DOM，直接操作DOM的弊端是什么？

操作DOM是非常昂贵的，因为一个普通的DOM上有非常多的属性和方法，页面的性能问题很多都是由DOM操作引起的。

VDOM的意义在于实现了对DOM的抽象，从而配合Diff算法来比对新旧状态切换时页面需要更新的最小DOM范围。
