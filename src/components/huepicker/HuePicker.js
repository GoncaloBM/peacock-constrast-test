import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { customMuiTheme } from "./MyTheme";
import "./HuePicker.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
/* import ContinuousSlider from "./Slider";
 */
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
});

class HuePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewColor: props.previewColor,
      color: "#9E9E9E",
      positionOfArray: 0,
    };
    this.keydown = this.keydown.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydown);
  }

  colors = [
    "#000000",
    "#FFFFFF",
    "#E7E7E7",
    "#FCCC12",
    "#111111",
    "#222222",
    "#444444",
    "#666666",
    "#888888",
    "#FC8542",
    "#4739DA",
  ];

  keydown(event) {
    // let colorPicked = this.state.colorPicked;
    let focusItem = this.props.focusItem;
    let colors = this.colors;
    let positionOfArray = this.state.positionOfArray;
    if (
      event.key === "ArrowRight" &&
      focusItem === 1 &&
      positionOfArray < colors.length &&
      !this.props.isText &&
      !this.props.isKeyboardActive
    ) {
      let currentPosition = positionOfArray + 1;
      this.setState({
        positionOfArray: currentPosition,
      });
      this.handleChangeComplete(colors[currentPosition - 1]);
    }

    if (
      event.key === "ArrowLeft" &&
      focusItem === 1 &&
      positionOfArray > 0 &&
      !this.props.isText &&
      !this.props.isKeyboardActive
    ) {
      let currentPosition = positionOfArray - 1;
      this.setState({
        positionOfArray: currentPosition,
      });
      this.handleChangeComplete(colors[currentPosition - 1]);
    }
    if (
      event.key === "ArrowRight" &&
      focusItem === 3 &&
      positionOfArray < colors.length &&
      this.props.isText &&
      !this.props.isKeyboardActive
    ) {
      let currentPosition = positionOfArray + 1;
      this.setState({
        positionOfArray: currentPosition,
      });
      this.handleChangeComplete(colors[currentPosition - 1]);
    }

    if (
      event.key === "ArrowLeft" &&
      focusItem === 3 &&
      positionOfArray > 0 &&
      this.props.isText &&
      !this.props.isKeyboardActive
    ) {
      let currentPosition = positionOfArray - 1;
      this.setState({
        positionOfArray: currentPosition,
      });
      this.handleChangeComplete(colors[currentPosition - 1]);
    }
  }

  handleChangeComplete = (color) => {
    console.log(this.props.isText);
    if (!this.props.isText) {
      this.props.changeBk("");
    }
    // this.props.changeBk("");
    this.setState({ color: color });
    this.props.getColor(color, this.props.isText);
    // this.setState({mouse:false})
  };

  render() {
    return (
      <div className="huePicker">
        {this.colors.map((item, i) => (
          <li key={i}>
            <div className={`${this.state.color === item ? "focused" : ""}`}>
              <Button style={{ backgroundColor: `${item}` }} />
            </div>
          </li>
        ))}
      </div>
    );
  }
}

HuePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HuePicker);
