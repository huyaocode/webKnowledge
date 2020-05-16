function useSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    document.title = size.join("x");
  });

  const onResize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });
  return size;
}

function App() {
  const [width, height] = useSize();
  return (
    <div>
      {width} x {height}
    </div>
  );
}
