import React from "react";
import { AlphaPicker } from "react-color";
import "./colorpicker.css";

class Alphapicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.previewColor,
    };
    this.keydown = this.keydown.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ color: this.props.previewColor });
    }
  }

  keydown = (event) => {
    let isText = this.props.isText;
    let isActive = this.props.isActive;
    let color = this.state.color;
    if (isActive && event.key === "ArrowLeft" && color.a > 0) {
      color.a = color.a - 0.02;
      color.a = Number(color.a.toFixed(2));
      this.setState({
        color: color,
      });
      this.props.getColor(color, isText);
      this.handleColorChange(color);
    } else if (isActive && event.key === "ArrowRight" && color.a < 1) {
      color.a = color.a + 0.02;
      color.a = Number(color.a.toFixed(2));
      this.setState({
        color: color,
      });
      this.props.getColor(color, isText);
    } else if (isActive && event.keyCode === 13) {
      this.setState({ color: color });

      console.log(color);
      this.props.getColor(color, isText);
    }
  };

  handleColorChange=(color)=>{
    let isText = this.props.isText;
    this.setState({ color: color });
    console.log("teclado")
    this.props.getColor(color, isText);
  };

  render() {
    return (
      <div className="alphapicker">
        <AlphaPicker
          onChange={this.handleColorChange}
          color={this.state.color}
        />
      </div>
    );
  }
}

export default Alphapicker;
