import React from "react";
import { AlphaPicker } from "react-color";
import "./colorpicker.css"

class Alphapicker extends React.Component {
  constructor() {
    super();
    this.state = {
      color: {
        r: 100,
        g: 100,
        b: 100,
        a: 1,
      },
    };
    this.keydown = this.keydown.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydown);
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     window.addEventListener("keydown", this.keydown.bind(this));
  //   }

  keydown = (event) => {
    let isActive = this.props.isActive;
    let color = this.state.color;
    if (isActive && event.key === "ArrowLeft" && color.a>0) {
      color.a = color.a - 0.02;
      this.setState({
        color: color,
      });
    } else if(isActive  && event.key === "ArrowRight"&& color.a<1) {
      color.a = color.a + 0.02;
      this.setState({
        color: color,
      });
    }
  };

  handleColorChange = (color) => {
    this.setState({ color: color });
  };

  render() {
    let color = this.state.color;
    return (
      <div className="alphapicker"
        style={{
          backgroundColor: color,
        }}
      >
        <AlphaPicker
          onChange={this.handleColorChange}
          color={this.state.color}
        />
      </div>
    );
  }
}

export default Alphapicker;
