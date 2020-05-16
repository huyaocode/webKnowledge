- VDOM 是什么？为什么会存在 VDOM？
- VDOM 如何应用，核心 API 是什么
- 介绍 diff 算法

### VDOM 是什么？为什么会存在 VDOM？

在 MVVM 开发方式中，页面的变化都是用数据去驱动的，而数据更新后，到底要去改那一块的 DOM 哪？
虽然可以先删除那个部分再按照当前新的数据去重新生成一个新的页面或生成那一个部分（jQuery 做法），但是这样肯定非常耗费性能的。
而且 JS 操作 DOM 是非常复杂，JS 操作 DOM 越多，控制与页面的耦合度就越高，代码越难以维护。

虚拟 DOM，即用 JS 对象来描述 DOM 树结构，Diff 算法则是找旧 VDOM 与新的 VDOM 的最小差异，然后再把差异渲染出来

![DOM](../img/domtree.png)
![vdom](../img/vdon.png)

描述一个 DOM 节点

- tag 标签名
- attrs DOM 属性键值对
- childen DOM 字节点数组 或 文本内容

[如何理解虚拟 DOM?-zhihu](https://www.zhihu.com/question/29504639?sort=created)

### 为什么 DOM 操作慢？ 因为属性太多了

![domattr](../img/domattr.png)

### vdom 如何应用，核心 API 是什么

- 创建虚拟节点
  - h('标签名', {...属性...}, [...子元素...])
  - h('标签名', {...属性...}, '文本内容')
- 将 VNode 添加到一个 DOM 元素内
  - patch(DOM_obj, vnode);
- 用一个新的 vnode 来和旧的 vnode 进行比较，得出新旧 dom 的差异
- patch(vnode, newVnode)

### diff 算法

对比 Vdom 树差异的算法
[React 的 diff 算法](https://segmentfault.com/a/1190000000606216)

#### 同层比对

新旧状态的比对时采用同层比对，当发现某节点不一致了直接替换该节点的子树。而不管它的子树是不是真的改动了。

#### key 值的使用

在列表循环的时候 React 会要求每一个列表项有一个**独一无二**，**稳定的 key 值**，它的目的是为了当状态改变时新旧状态的每一个列表项能够对应起来，方便比对。

Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。
Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系

#### 合并操作

调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制
