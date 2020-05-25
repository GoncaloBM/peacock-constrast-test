import React from "react";
import { TwitterPicker } from "react-color";
import "./colorpicker.css";

class Twitterpicker extends React.Component {
  constructor(props) {
    super();
    this.state = {
      previewColor: props.previewColor,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ previewColor: this.props.previewColor });
    }
  }

  handleChangeComplete = (color) => {
    this.props.changeBk("");

    if (this.state.mouse === true) {
      this.setState({ color: color.rgb });
      this.props.getColor(color.rgb, this.props.isText);
      this.setState({ mouse: false });
    }
  };

  render() {
    return (
      <div
        className="twitterpicker"
        style={{
          backgroundColor: `rgb(${this.state.previewColor.r},${this.state.previewColor.g},${this.state.previewColor.b},${this.state.previewColor.a})`,
        }}
        onClick={() => this.setState({ mouse: true })}
      >
        <TwitterPicker
          color={this.state.color}
          onChangeComplete={this.handleChangeComplete}
          colors={[
            "#000000",
            "#888888",
            "#E7E7E7",
            "#FCCC12",
            "#111111",
            "#222222",
            "#4739DA",
            "#FC8542",
            "#666666",
          ]}
        />{" "}
      </div>
    );
  }
}

export default Twitterpicker;
