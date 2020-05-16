# 常用 hooks

### useState()

当给 setCount 传入一个与 count 相同的原始值时，组件不会重新渲染。当传递一个对象时，无论是否一样都会渲染

useState()方法可以传递值也可以传递函数，可延迟初始化，此函数在多次渲染时只运行一次。

```jsx
function App(props) {
  const [count, setCount] = useState(() => {
    console.log("only run one time");
    return props.defaultCount || 0;
  });
  return <div></div>;
}
```

### useEffect

- 副作用调用时机
  - mount 后
  - update 前
  - unmount 前

useEffect 返回函数的作用是清除上一次副作用遗留下来的状态。

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log("======== render ======== ");

  const onResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onClick = () => {
    console.log("click");
  };

  // 需要频繁清理并绑定的副作用
  useEffect(() => {
    document.getElementById("size").addEventListener("click", onClick);
    return () => {
      document.getElementById("size").removeEventListener("click", onClick);
    };
  });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        {" "}
        Count: {count} 点了之后 id 为 size 的元素就会被替换
      </button>

      <br />
      {count % 2 ? (
        <button id="size">
          size: {size.width} x {size.height}，点击有console
        </button>
      ) : (
        <div id="size">
          size: {size.width} x {size.height}，点击有console
        </div>
      )}
    </div>
  );
}
```

### useContext

用来向所有后代组件传递 props

更爽的使用 context，替代 Content.Consumer

```jsx
const CountContext = createContext();

function Foo() {
  const count = useContext(CountContext);
  return <h2>{count}</h2>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <CountContext.Provider value={count}>
        <Foo />
      </CountContext.Provider>
    </div>
  );
}
```

### useMemo

useCallback 和 useMemo 的参数跟 useEffect 一致，他们之间最大的区别有是 useEffect 会用于处理副作用，这两个 hooks 不能。

使用 useMemo 方法可以避免无用方法的调用,

```jsx
/**
 * 如果不加useMemo, 即时name不变，也会执行changeName函数，是不必要的
 * 如果changeName中使用了setState，那就相当于优化了
 */
const otherName = useMemo(() => {
  changeName(name);
}, [name]);
```

### useCallback

如果 usememo 返回的是一个函数，那么可以使用 useCallback 替代

useCallback 解决的是传入子组件参数过度变化导致子组件过度渲染的问题

```js
// 这两个是等价的
useMemo(() => fn, []);
useCallback(fn, []);
```

每一次函数组件重新执行一次，这两个内部函数都会重复创建。然而实际上，他们都是一样的。 所以很多传递给子组件的函数直接使用 useCallback 包裹起来，会提升性能

### Ref Hooks

1. 使用 Eef 保存变量：
   因为函数组件每一次都会重新执行，保存一些每一次都需要的使用的变量就需要 Ref Hook

定时器，Ref Hooks 的最佳实践

```jsx
function App() {
  const [count, setCount] = useState(1);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(timer.current);
    }
  });

  return (
    <>
      <h1>count: {count}</h1>
    </>
  );
}
```

2. 使用 Ref 保存上一个状态的值

```JSX
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef(-1);
  useEffect(() => {
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  return (
    <>
      <button
        onClick={() => {
          setCount(count => count + 1);
        }}
      >
        add{' '}
      </button>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
    </>
  );
}
```
