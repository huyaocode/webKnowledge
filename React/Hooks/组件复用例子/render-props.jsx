/**
 * 用一个函数属性的执行结果，来当作自己的渲染结果
 */

class Resizeable extends Component {
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
    return this.props.render(this.state.size);
  }
}

class Foo extends Component {
  render() {
    const [width, height] = this.props.size;
    return (
      <div>
        {width} x {height}
      </div>
    );
  }
}

<Resizeable render={(size) => <Foo size={size} />} />;
