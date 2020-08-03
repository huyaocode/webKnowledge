# context 与 contextType

## context 上下文

context 提供一种方式，能够让属性在后代组件树中直接获取，而不是一层一层的传递。

context 会在属性值变化时重新渲染 Consumer 下面的元素

多个 Provider 可以嵌套起来使用

不过这种方式可能使组件失去独立性，复用更困难。

### API

- createContext(defaultValue)
  - 创建 context 对象的唯一方式,
  - defaultValue 是在找不到 provider 提供值时使用，做业务不会用。写单测可能用
- `<SOMEContext.Provider>`
  - 提供属性
- `<SOMEContext.Consumer>`
  - 消费属性
  - Consumer 可以使用多次
  - Consumer 不能并列用，要嵌套用
  - 函数组件也可以传递

## contextType

挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

```JSX
class Another extends Component {
  static contextType = SOMEContext;
  render() {
    let battery = this.context;
    return <h3>{battery}</h3>;
  }
}
```

## demo

```jsx
import React, { Component, createContext } from "react";

// Battery 电池
const BatteryContext = createContext();
const OnlineContext = createContext();

function Extra() {
  return (
    <OnlineContext.Consumer>
      {(online) => (
        <div>
          测试已经 consumer 过的属性是否还能继续使用 Online: {String(online)}
        </div>
      )}
    </OnlineContext.Consumer>
  );
}

class Another extends Component {
  static contextType = BatteryContext;
  render() {
    let battery = this.context;
    return <h3>{battery}</h3>;
  }
}

function Leaf() {
  return (
    <BatteryContext.Consumer>
      {(battery) => (
        <div>
          <OnlineContext.Consumer>
            {(online) => (
              <div>
                <h1>
                  Battery: {battery}, Online: {String(online)}
                </h1>
                <Extra />
                <Another />
              </div>
            )}
          </OnlineContext.Consumer>
        </div>
      )}
    </BatteryContext.Consumer>
  );
}

function Middle() {
  return <Leaf />;
}

class App extends Component {
  state = { battery: 60, online: false };
  render() {
    const { battery, online } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => this.setState({ battery: battery - 1 })}
          >
            Press
          </button>

          <button
            type="button"
            onClick={() => this.setState({ online: !online })}
          >
            Switch
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}

export default App;
```
