# React

## [VDOM](VDOM.md)

## [Redux](Redux.md)

## [React中性能优化](React中性能优化.md)

### react生命周期函数

一、初始化阶段：
 - getDefaultProps:获取实例的默认属性
 - getInitialState:获取每个实例的初始化状态
 - componentWillMount：组件即将被装载、渲染到页面上
 - render:组件在这里生成虚拟的DOM节点
 - componentDidMount:组件真正在被装载之后

二、运行中状态：
 - componentWillReceiveProps:组件将要接收到属性的时候调用
 - shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回false，接收数据后不更新，阻止render调用，后面的函数不会被继续执行了）
 - componentWillUpdate:组件即将更新不能修改属性和状态
 - render:组件重新描绘
 - componentDidUpdate:组件已经更新

三、销毁阶段：
 - componentWillUnmount:组件即将销毁


### 当你调用setState的时候，发生了什么事？

 - 将传递给 setState 的对象合并到组件的当前状态，触发所谓的调和过程（Reconciliation）
 - 然后生成新的DOM树并和旧的DOM树使用Diff算法对比
 - 根据对比差异对界面进行最小化重渲染



### setState第二个参数的作用

因为setState是一个异步的过程，所以说执行完setState之后不能立刻更改state里面的值。如果需要对state数据更改监听，setState提供第二个参数，就是用来监听state里面数据的更改，当数据更改完成，调用回调函数。


### 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象
setState它是一个异步函数，他会合并多次修改，降低diff算法的比对频率。这样也会提升性能。

因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。



### react中key的作用
key是React中用于追踪哪些列表中元素被修改、删除或者被添加的辅助标识。在diff算法中，key用来判断该元素节点是被移动过来的还是新创建的元素，减少不必要的元素重复渲染。



### sass和less的区别
定义变量的符号不同，less是用@，sass使用$
变量的作用域不同，less在全局定义，就作用在全局，在代码块中定义，就作用于整哥代码块。而sass只作用域全局。


### 高阶组件 HOC (higher order component)

高阶组件是一个以组件为参数并返回一个新组件的函数。

HOC 允许你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。


### react生命周期中，最适合与服务端进行数据交互的是哪个函数
`componentDidMount`：在这个阶段，**实例和dom已经挂载完成，可以进行相关的dom操作**。


### react中组件传值
父传子（组件嵌套浅）：父组件定义一个属性，子组件通过this.props接收。

子传父：父组件定义一个属性，并将一个回调函数赋值给定义的属性，然后子组件进行调用传过来的函数，并将参数传进去，在父组件的回调函数中即可获得子组件传过来的值。



### 在constructor中绑定事件函数的this指向
把一个对象的方法赋值给一个变量会造成this的丢失，所以需要绑定this，把绑定放在构造函数中可以保证只绑定一次函数，如果放在render函数中绑定this的话每次渲染都会去绑定一次this，那样是很耗费性能的。



### shouldComponentUpdate(nextProps, nextState)
当父组件被重新渲染时即render函数执行时，子组件就会默认被重新渲染，但很多时候是不需要重新渲染每一个子组件的。这时就可以使用 shouldComponentUpdate 来判断是否真的需要重新渲染子组件。仅仅一个判断，就可以节约很多的消耗。
所以对于父组件发生变化而子组件不变的情况，使用shouldComponentUpdate会提升性能。
```js
shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.content === this.props.content) {
        return false;
    } else {
        return true;
    }
}
```



### 使用PureComponent
`PureComponent`内部帮我们实现了`shouldComponentUpdate`的比较，其他和Component一样。但是在shouldComponentUpdate进行的是一个**浅比较**，看看官方文档是怎么说的。

浅比较只比较第一层的基本类型和引用类型值是否相同

如果数据结构比较复杂，那么可能会导致一些问题，要么当你知道改变的时候调用`forceUpdate`,要么使用`immutable`来包装你的state



### 无状态组件
无状态组件就是使用定义函数的方式来定义组件，这种组件相比于使用类的方式来定义的组件(有状态组件)，少了很多初始化过程，更加精简，所以要是可以使用无状态组件应当尽可能的使用无状态组件，会大幅度提升效率



### refs 作用
Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的API。



### (在构造函数中)调用 super(props) 的目的是什么

在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。



### 展示组件(Presentational component)和容器组件(Container component)之间有何不同

- 展示组件关心组件看起来是什么。
  - 展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。
- 容器组件则更关心组件是如何运作的。
  - 容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。



### 类组件(Class component)和函数式组件(Functional component)之间有何不同

- 类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
- 当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件



### 客户端渲染与服务端渲染
客户端渲染即普通的React项目渲染方式。
客户端渲染流程：
1. 浏览器发送请求
2. 服务器返回HTML
3. 浏览器发送bundle.js请求
4. 服务器返回bundle.js
5. 浏览器执行bundle.js中的React代码

CSR带来的问题：
1. 首屏加载时间过长
2. SEO 不友好

因为时间在往返的几次网络请求中就耽搁了，而且因为CSR返回到页面的HTML中没有内容，就只有一个root空元素，页面内容是靠js渲染出来的，爬虫在读取网页时就抓不到信息，所以SEO不友好

SSR带来的问题：
1. React代码在服务器端执行，很大的消耗了服务器的性能



### React 同构时页面加载流程
1. 服务端运行React代码渲染出HTML
2. 浏览器加载这个无交互的HTML代码
3. 浏览器接收到内容展示
4. 浏览器加载JS文件
5. JS中React代码在浏览器中重新执行



### 应该在 React 组件的何处发起 Ajax 请求

在 React 组件中，应该在 componentDidMount 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。
更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。