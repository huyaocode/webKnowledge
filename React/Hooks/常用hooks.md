# 常用 hooks

### useState()

当给 setCount 传入一个与 count 相同的原始值时，组件不会重新渲染。当传递一个对象时，无论是否一样都会渲染

useState()方法可以传递值也可以传递函数，可延迟初始化，此函数在多次渲染时只运行一次。

```jsx
function App(props) {
  const [count, setCount] = useState(() => {
    console.log('only run one time');
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
    height: window.innerHeight
  });

  console.log('======== render ======== ');

  const onResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onClick = () => {
    console.log('click');
  };

  // 需要频繁清理并绑定的副作用
  useEffect(() => {
    document.getElementById('size').addEventListener('click', onClick);
    return () => {
      document.getElementById('size').removeEventListener('click', onClick);
    };
  });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        {' '}
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

使用useMemo方法可以避免无用方法的调用,
```jsx
/**
 * 如果不加useMemo, 即时name不变，也会执行changeName函数，是不必要的
 * 如果changeName中使用了setState，那就相当于优化了
 */
const otherName = useMemo(() => {
  changeName(name)
}, [name]);
```