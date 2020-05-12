import React from "react";
import { TwitterPicker} from "react-color";

class Twitterpicker extends React.Component {
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
    console.log(event.key);
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.rgb });
  };

  render() {
    let color = this.state.color;
    return (
      <div
        style={{
          backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`,
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
