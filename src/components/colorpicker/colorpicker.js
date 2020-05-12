import React from "react";
import { TwitterPicker, AlphaPicker } from "react-color";

class Colorpicker extends React.Component {
  state = {
    color: {
      r: 100,
      g: 100,
      b: 100,
      a: 1,
    },
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.rgb });
  };

  handleColorChange = (color) => {
    this.setState({color:color.rgb});}

  render() {
    let color = this.state.color;
    return (
      <div style={{backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`}}>
        <TwitterPicker
          color={this.state.color}
          onChangeComplete={this.handleChangeComplete}
        />
        <AlphaPicker
          onChange={this.handleColorChange}
          color={this.state.color}
        />
      </div>
    );
  }
}

export default Colorpicker;
