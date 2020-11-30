# decorateComponentWithProps

一个简单的工具函数包装你的组件，让它得到额外的参数。

github: https://github.com/belle-ui/decorateComponentWithProps

### 源码

```jsx
const decorateComponentWithProps = (EmbeddedComponent, props) => (class extends Component {
  render() {
    return (
      <EmbeddedComponent { ...this.props } { ...props } />
    );
  }
});
```

### 用法
```ts
const props = {
  wine: 'red',
  beer: 'ipa',
  food: 'spaghetti',
};

MyDecoratedComponent = decorateComponentWithProps(MyComponent, props);
```