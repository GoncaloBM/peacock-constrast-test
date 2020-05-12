import React from "react";
import { AlphaPicker } from "react-color";


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
        activePicker:"twitter"
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
    
    handleColorChange = (color) => {
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
          <AlphaPicker
            onChange={this.handleColorChange}
            color={this.state.color}
          />
        </div>
      );
    }
  }
  
  export default Alphapicker;