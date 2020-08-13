# 其他 hooks

## useLayoutEffect

useLayoutEffect 的函数签名与 useEffect 相同，但是它会在所有的 DOM 变更之后**同步**调用 effect。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

useLayoutEffect 相比 useEffect，通过同步执行状态更新可解决一些特性场景下的页面闪烁问题。

useEffect 可以满足百分之 99 的场景，而且 useLayoutEffect 会阻塞渲染，请谨慎使用。

演示例子： https://juejin.im/post/6844904008402862094
