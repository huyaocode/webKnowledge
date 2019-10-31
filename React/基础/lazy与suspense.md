# Lazy与Suspense

## lazy
React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

lazy函数用来将组件模块的导入行为封装为React组件。封装的是组件导入行为，而不是组件本身。而且导入意味着网络请求。

## Suspense
lazy必须配合Suspense来一起使用，因为在异步加载的过程中，这个空白档必须要给React提供一个loading的组件
注意：
 - Suspense的fallback属性必须传入一个React实例，即一个JSX

## ErrorBoundary
当React的异步组件加载出错时，页面就会报错。它利用了`componentDidCatch`这个生命周期函数来。


## 例子
```jsx
const About = lazy(
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(import(/* webpackChunkName:"about" */'./About.jsx'));
      }, 2000);
    })
);

class App extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      </div>
    )
  }
}
```