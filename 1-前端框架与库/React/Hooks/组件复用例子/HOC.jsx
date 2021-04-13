/**
 * 高阶组件复用逻辑
 *
 * 调用方便
 */

function resizeable(Child) {
  return class Wrapper extends React.Component {
    state = {
      size: [window.innerWidth, window.innerHeight],
    };

    onResize = () => {
      this.setState({
        size: [window.innerWidth, window.innerHeight],
      });
    };

    componentDidMount() {
      window.addEventListener("resize", this.onResize);
      document.title = this.state.size.join("x");
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.onResize);
    }

    componentDidUpdate() {
      document.title = this.state.size.join("x");
    }

    render() {
      const size = this.state.size;
      return <Child size={size} />;
    }
  };
}

class Foo extends React.Component {
  render() {
    const [width, height] = this.props.size;
    return (
      <div>
        {width} x {height}
      </div>
    );
  }
}

const WrapperedFoo = resizeable(Foo);
