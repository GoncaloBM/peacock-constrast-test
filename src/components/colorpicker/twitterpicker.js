import React from "react";
import { TwitterPicker } from "react-color";
import "./colorpicker.css"

class Twitterpicker extends React.Component {
  constructor(props) {
    super();
    this.state = {
      previewColor: props.previewColor

    };
    this.keydown = this.keydown.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.keydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydown);
  }
  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      this.setState({      previewColor: this.props.previewColor
      })
    }

  }

  //   componentDidUpdate(prevProps, prevState) {
  //     window.addEventListener("keydown", this.keydown.bind(this));
  //   }

  keydown = (event) => {
    let isActive = this.props.isActive;
    let isKeyboardActive = this.props.isKeyboardActive;
    let color = {...this.state.color};
    let color1 = "#000000";
    let color2 = "#888888";
    let color3 = "#E7E7E7";
    let color4 = "#FCCC12";
    let color5 = "#111111";
    let color6 = "#222222";
    let color7 = "#4739DA";
    let color8 = "#FC8542";
    let color9 = "#666666";

    if (isActive && isKeyboardActive === false && event.key === "ArrowRight") {
      if (color === color1) {
        this.setState({
          color: color2,
        });
      } else if (color === color2) {
        this.setState({
          color: color3,
        });
      } else if (color === color3) {
        this.setState({
          color: color4,
        });
      } else if (color === color4) {
        this.setState({
          color: color5,
        });
      } else if (color === color5) {
        this.setState({
          color: color6,
        });
      } else if (color === color6) {
        this.setState({
          color: color7,
        });
      } else if (color === color7) {
        this.setState({
          color: color8,
        });
      } else if (color === color8) {
        this.setState({
          color: color9,
        });
      } else if (color === color9) {
        this.setState({
          color: color1,
        });
      }
    } else if (isActive  && isKeyboardActive === false && event.key === "ArrowLeft") {
      if (color === color1) {
        this.setState({
          color: color9,
        });
      } else if (color === color2) {
        this.setState({
          color: color1,
        });
      } else if (color === color3) {
        this.setState({
          color: color2,
        });
      } else if (color === color4) {
        this.setState({
          color: color3,
        });
      } else if (color === color5) {
        this.setState({
          color: color4,
        });
      } else if (color === color6) {
        this.setState({
          color: color5,
        });
      } else if (color === color7) {
        this.setState({
          color: color6,
        });
      } else if (color === color8) {
        this.setState({
          color: color7,
        });
      } else if (color === color9) {
        this.setState({
          color: color8,
        });
      }
    }
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.rgb });
    console.log(color.rgb)
    this.props.getColor(color.rgb, this.props.isText)
  };

  render() {
    return (
      <div className="twitterpicker"
        style={{
          backgroundColor:`rgb(${this.state.previewColor.r},${this.state.previewColor.g},${this.state.previewColor.b},${this.state.previewColor.a})`,
        }}
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
        />
      </div>
    );
  }
}

export default Twitterpicker;
