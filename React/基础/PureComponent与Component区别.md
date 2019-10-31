# [何时使用Component还是PureComponent？](https://segmentfault.com/a/1190000014979065)

参考链接：https://segmentfault.com/a/1190000014979065

PureComponent通过prop和state的浅比较来实现shouldComponentUpdate，某些情况下可以用PureComponent提升性能

所谓浅比较(shallowEqual)，即react源码中的一个函数，然后根据下面的方法进行是不是PureComponent的判断，帮我们做了本来应该我们在shouldComponentUpdate中做的事情

```js
if (this._compositeType === CompositeTypes.PureClass) {
    shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
```

```js
shouldComponentUpdate(nextProps, nextState) {
    return (nextState.person !== this.state.person);
}
```

### 什么时候不该用？
PureComponent中的判断逻辑是浅比较，如果当状态更新时是一个引用对象内部的更新，那么这个时候是不适用的

