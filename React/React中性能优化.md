[React 性能优化](https://segmentfault.com/a/1190000006254212)

[React 进阶—性能优化](https://segmentfault.com/a/1190000008925295)

### 为什么使用 Virtual DOM，直接操作 DOM 的弊端是什么？

操作 DOM 是非常昂贵的，因为一个普通的 DOM 上有非常多的属性和方法，页面的性能问题很多都是由 DOM 操作引起的。

VDOM 的意义在于实现了对 DOM 的抽象，从而配合 Diff 算法来比对新旧状态切换时页面需要更新的最小 DOM 范围。
