### 自定义 hooks

因为可以自定义 Hooks, 我们可以非常方便的复用状态逻辑。

```jsx
// 定时器DEMO
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
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
  return [count];
}

function App() {
  const [count] = useCount(0);
  return (
    <>
      <h1>count: {count}</h1>
    </>
  );
}
```
