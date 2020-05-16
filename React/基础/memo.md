# memo

在类组件中，我们使用`shouldComponentUpdate`来比避免不需要的渲染

```JSX
// 使用 shouldComponentUpdate
class Foo {
  shouldComponentUpdate(nextProps,nextState) {
    if(nextProps.SOME_VALUE === this.props.SOME_VALUE){
      return false
    }
    return true;
  }
  render () {
    return <div>{props.SOME_VALUE}</div>
  }
}
// 或者直接继承 PureComponent
class Foo extends PureComponent {
  render () {
    return <div>{props.SOME_VALUE}</div>
  }
}
```

## 函数组件使用 memo

函数组件未来避免比必要更新

```jsx
const Foo = memo(function (props) {
  return <div>{props.SOME_VALUE}</div>;
});
```
