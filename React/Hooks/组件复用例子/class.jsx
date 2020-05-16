/**
 * 最传统类组件
 */

class Foo extends React.Component {
  state = {
    size: [window.innerWidth, window.innerHeight],
  };

  onResize = () => {
    this.setState({ size: [window.innerWidth, window.innerHeight] });
  };

  componentDidMount() {
    window.addEventListener("resize", onResize);
    document.title = this.state.size.join("x");
  }

  componentWillUnmount() {
    window.removeEventListener("resize", onResize);
  }

  componentDidUpdate() {
    document.title = this.state.size.join("x");
  }

  render() {
    const [width, height] = this.state.size;
    return (
      <div>
        {width} x {height}
      </div>
    );
  }
}
