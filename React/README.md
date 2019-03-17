# React

## [VDOM](VDOM.md)

## [Redux](Redux.md)

## [React中性能优化](React中性能优化.md)

## [React与Vue区别](react与vue区别.md)

### React 的工作原理

React 会创建一个虚拟 DOM(virtual DOM)。当一个组件中的状态改变时，React 首先会通过 "diffing" 算法来标记虚拟 DOM 中的改变，第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。


### 使用 React 有何优点
 - JSX 的引入，使得组件的代码更加可读，也更容易看懂组件的布局，或者组件之间是如何互相引用的
 - 支持服务端渲染，可改进SEO和性能
 - 易于测试
 - React 只关注 View 层，所以可以和其它任何框架(如Backbone.js, Angular.js)一起使用


### react生命周期函数

一、初始化阶段：
 - getDefaultProps
   - 获取实例的默认属性
 - getInitialState
   - 获取每个实例的初始化状态
 - componentWillMount
   - 组件即将被装载、渲染到页面上
   - 多用于根组件中的应用程序配置
 - render
   - 组件在这里生成虚拟的DOM节点
 - componentDidMount
   - 组件真正在被装载之后
   - 在这可以完成所有没有 DOM 就不能做的所有配置，并开始获取所有你需要的数据（发送请求）；如果需要设置事件监听，也可以在这完成


二、运行中状态：
 - componentWillReceiveProps
   - 组件将要接收到属性的时候调用
 - shouldComponentUpdate
   - 是一个改善性能的地方，组件接受到新属性或者新状态的时候（可以返回false，接收数据后不更新，阻止render调用，后面的函数不会被继续执行了）
 - componentWillUpdate
   - 组件即将更新不能修改属性和状态
 - render
   - 组件重新描绘
 - componentDidUpdate
   - 组件已经更新
   - 响应 prop 或 state 的改变

三、销毁阶段：
 - componentWillUnmount
   - 组件即将销毁
   - 在这你可以取消网络请求，或者移除所有与组件相关的事件监听器


### 当你调用setState的时候，发生了什么事？

 - 将传递给 setState 的对象合并到组件的当前状态，触发所谓的调和过程（Reconciliation）
 - 然后生成新的DOM树并和旧的DOM树使用Diff算法对比
 - 根据对比差异对界面进行最小化重渲染



### setState第二个参数的作用

因为setState是一个异步的过程，所以说执行完setState之后不能立刻更改state里面的值。如果需要对state数据更改监听，setState提供第二个参数，就是用来监听state里面数据的更改，当数据更改完成，调用回调函数。


### 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象

setState它是一个异步函数，他会合并多次修改，降低diff算法的比对频率。这样也会提升性能。

因为 this.props 和 this.state 的**更新是异步的**，**不能依赖它们的值**去计算下一个 state。



### react中key的作用
key是React中用于追踪哪些列表中元素被修改、删除或者被添加的辅助标识。在diff算法中，key用来判断该元素节点是被移动过来的还是新创建的元素，减少不必要的元素重复渲染。



### sass和less的区别
定义变量的符号不同，less是用@，sass使用$
变量的作用域不同，less在全局定义，就作用在全局，在代码块中定义，就作用于整哥代码块。而sass只作用域全局。



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

**在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。** 
传递 props 给 super() 的原因则是让子类中能用 constructor 访问 this.props。



### 展示组件(Presentational component)和容器组件(Container component)之间有何不同

- 展示组件关心组件看起来是什么。
  - 展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。
- 容器组件则更关心组件是如何运作的。
  - 容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。



### 类组件(Class component)和函数式组件(Functional component)之间有何不同

 - 类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
 - 当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件



### 状态(state)和属性(props)之间有何不同
`State`是一种数据结构，用于组件挂载时所需的默认值。State可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。

`props`是组件的配置。props由父组件传递给子组件，就子组件而言，props是不可变的。组件不能改变自身props，但是可以把其他子组件的props防止一起管理。 
props也不仅仅是数据，回调函数也可以通过props传递。



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


### 受控组件(controlled component)

一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。

在 HTML 中，类似 `<input>`, `<textarea>` 和 `<select>` 这样的表单元素会维护自身的状态，并基于用户的输入来更新。但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值。


### 除了在构造函数中绑定 this，还有其它方式吗

你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。


### 怎么阻止组件的渲染

在组件的 render 方法中返回 null 并不会影响触发组件的生命周期方法


### 前端路由原理
前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式。
 - Hash 模式
 - History 模式

#### Hash 模式

`www.test.com/#/` 就是 Hash URL，当 # 后面的哈希值发生变化时，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 www.test.com。
```js
window.addEventListener('hashchange', () => {
  // ... 具体逻辑
})
```

#### History 模式
History 模式是 HTML5 新推出的功能，主要使用 `history.pushState` 和 `history.replaceState` 改变 URL。

通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。

```js
// 新增历史记录
history.pushState(stateObject, title, URL)
// 替换当前历史记录
history.replaceState(stateObject, title, URL)
```

当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件
```js
window.addEventListener('popstate', e => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state)
})
```

#### 两种模式对比
 - Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
 - History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
 - Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候


### Vue 和 React区别
改变数据方式不同，Vue 修改状态相比来说要简单许多，React 需要使用 setState 来改变状态，并且使用这个 API 也有一些坑点。
 Vue 的底层使用了依赖追踪，页面更新渲染已经是最优的了，但是 React 还是需要用户手动去优化这方面的问题。

React 需要使用 JSX，Vue 使用了模板语法



### 高阶组件 HOC (higher order component)

高阶组件是一个以组件为参数并返回一个新组件的函数。

HOC 允许你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。

```js
function add(a, b) {
    return a + b
}
```
现在如果我想给这个 add 函数添加一个输出结果的功能，那么你可能会考虑我直接使用 console.log 不就实现了么。说的没错，但是如果我们想做的更加优雅并且容易复用和扩展，我们可以这样去做：
```js
function withLog (fn) {
    function wrapper(a, b) {
        const result = fn(a, b)
        console.log(result)
        return result
    }
    return wrapper
}
const withLogAdd = withLog(add)
withLogAdd(1, 2)
```
这个做法在函数式编程里称之为高阶函数，大家都知道 React 的思想中是存在函数式编程的，高阶组件和高阶函数就是同一个东西。我们实现一个函数，传入一个组件，然后在函数内部再实现一个函数去扩展传入的组件，最后返回一个新的组件，这就是高阶组件的概念，作用就是为了更好的复用代码。


### 事件机制
React 其实自己实现了一套事件机制，首先我们考虑一下以下代码：
```js
const Test = ({ list, handleClick }) => ({
    list.map((item, index) => (
        <span onClick={handleClick} key={index}>{index}</span>
    ))
})
```

事实当然不是，JSX 上写的事件并没有绑定在对应的真实 DOM 上，而是通过事件代理的方式，将所有的**事件都统一绑定在了`document`上**。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。

另外冒泡到 document 上的事件也不是原生浏览器事件，而是**React自己实现的合成事件**（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 event.stopPropagation 是无效的，而应该调用 event.preventDefault。

那么实现合成事件的目的好处有两点，分别是：
 - 合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力
 - 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。