import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider } from "@material-ui/core/styles";
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
      hue: props.hue,
      previewColor: props.previewColor,
      colorPicked: "",
      color:{r: 158, g: 158, b: 158, a: 1}
    };
    this.keydown = this.keydown.bind(this);
  }

  // setHue = (hue) => {
  //   this.setState({
  //     hue: hue,
  //   });
  // };

  // getHue = (hue) => {
  //   this.setHue(hue);
  // };

  handleChangeComplete = (color) => {
    if (!this.props.isText) {
      this.props.changeBk("");
    }

    // this.props.changeBk("");
    color.a = 1;
    this.setState({ color: color });
    this.props.getColor(color, this.props.isText);
    // this.setState({mouse:false})
  };

  componentDidMount() {
    window.addEventListener("keydown", this.keydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydown);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hue !== this.props.hue) {
      this.setHueState();
    }
  }

  setHueState() {
    this.setState({
      hue: this.props.hue,
    });
  }

  keydown(event) {
    let colorPicked = this.state.colorPicked;
    if (
      event.key === "ArrowRight" &&
      this.props.isActive &&
      this.props.showVirtualKeyboard === false
    ) {
      if (colorPicked === "") {
        this.setState({
          colorPicked: "yellow",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.yellow.backgroundColor
          )
        );
      } else if (colorPicked === "yellow") {
        this.setState({
          colorPicked: "purple",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.purple.backgroundColor
          )
        );
      } else if (colorPicked === "purple") {
        this.setState({
          colorPicked: "orange",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.orange.backgroundColor
          )
        );
      } else if (colorPicked === "orange") {
        this.setState({
          colorPicked: "red",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.red.backgroundColor
          )
        );
      } else if (colorPicked === "red") {
        this.setState({
          colorPicked: "grey",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.cinza.backgroundColor
          )
        );
      } else if (colorPicked === "grey") {
        this.setState({
          colorPicked: "blue",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.blue.backgroundColor
          )
        );
      } else if (colorPicked === "blue") {
        this.setState({
          colorPicked: "green",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.green.backgroundColor
          )
        );
      } else if (colorPicked === "green") {
        this.setState({
          colorPicked: "slider",
        });
        // this.handleChangeComplete(
        //   this.hexToRgb(
        //     customMuiTheme(this.state.hue).palette.purple.backgroundColor
        //   )
        // );
      }
    }
    if (
      event.key === "ArrowLeft" &&
      this.props.isActive &&
      this.props.showVirtualKeyboard === false
    ) {
      if (colorPicked === "") {
        this.setState({
          colorPicked: "slider",
        });
        // this.handleChangeComplete(
        //   this.hexToRgb(
        //     customMuiTheme(this.state.hue).palette.yellow.backgroundColor
        //   )
        // );
      } else if (colorPicked === "slider") {
        this.setState({
          colorPicked: "green",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.green.backgroundColor
          )
        );
      } else if (colorPicked === "green") {
        this.setState({
          colorPicked: "blue",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.blue.backgroundColor
          )
        );
      } else if (colorPicked === "blue") {
        this.setState({
          colorPicked: "grey",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.cinza.backgroundColor
          )
        );
      } else if (colorPicked === "grey") {
        this.setState({
          colorPicked: "red",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.red.backgroundColor
          )
        );
      } else if (colorPicked === "red") {
        this.setState({
          colorPicked: "orange",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.orange.backgroundColor
          )
        );
      } else if (colorPicked === "orange") {
        this.setState({
          colorPicked: "purple",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.purple.backgroundColor
          )
        );
      } else if (colorPicked === "purple") {
        this.setState({
          colorPicked: "yellow",
        });
        this.handleChangeComplete(
          this.hexToRgb(
            customMuiTheme(this.state.hue).palette.yellow.backgroundColor
          )
        );
      }
    }
  }

  hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
   

  render() {
    const { classes } = this.props;
    return (
      <div className="huePicker">
        <div
          className="twitterpicker"
          style={{
            backgroundColor: `rgb(${this.state.previewColor.r},${this.state.previewColor.g},${this.state.previewColor.b},${this.state.previewColor.a})`,
          }}
          onClick={() => this.setState({ mouse: true })}
        ></div>
        <MuiThemeProvider theme={customMuiTheme(this.state.hue)}>
          <div className="buttonsColor">
            <div
              className={`${
                this.state.colorPicked === "yellow" ? "focused" : ""
              }`}
            >
              <Button
                variant="raised"
                style={customMuiTheme(this.state.hue).palette.yellow}
                className={classes.primary}
                onClick={() =>
                  this.handleChangeComplete(
                    this.hexToRgb(
                      customMuiTheme(this.state.hue).palette.yellow
                        .backgroundColor
                    )
                  )
                }
              ></Button>
            </div>
            <div
              className={`${
                this.state.colorPicked === "purple" ? "focused" : ""
              }`}
            >
              <Button
                variant="raised"
                style={customMuiTheme(this.state.hue).palette.purple}
                className={classes.primary}
                onClick={() =>
                  this.handleChangeComplete(
                    this.hexToRgb(
                      customMuiTheme(this.state.hue).palette.purple
                        .backgroundColor
                    )
                  )
                }
              ></Button>
            </div>
            <div
              className={`${
                this.state.colorPicked === "orange" ? "focused" : ""
              }`}
            >
              <Button
                variant="raised"
                style={customMuiTheme(this.state.hue).palette.orange}
                className={classes.primary}
                onClick={() =>
                  this.handleChangeComplete(
                    this.hexToRgb(
                      customMuiTheme(this.state.hue).palette.orange
                        .backgroundColor
                    )
                  )
                }
              ></Button>
            </div>
            <div
              className={`${this.state.colorPicked === "red" ? "focused" : ""}`}
            >
              <Button
                variant="raised"
                style={customMuiTheme(this.state.hue).palette.red}
                className={classes.primary}
                onClick={() =>
                  this.handleChangeComplete(
                    this.hexToRgb(
                      customMuiTheme(this.state.hue).palette.red.backgroundColor
                    )
                  )
                }
              ></Button>
            </div>
            <div
              className={`${
                this.state.colorPicked === "grey" ? "focused" : ""
              }`}
            >
              <Button
                variant="raised"
                style={customMuiTheme(this.state.hue).palette.cinza}
                className={classes.primary}
                onClick={() =>
                  this.handleChangeComplete(
                    this.hexToRgb(
                      customMuiTheme(this.state.hue).palette.cinza
                        .backgroundColor
                    )
                  )
                }
              ></Button>
            </div>
            <div
              className={`${
                this.state.colorPicked === "blue" ? "focused" : ""
              }`}
            >
              <Button
                variant="raised"
                style={customMuiTheme(this.state.hue).palette.blue}
                className={classes.primary}
                onClick={() =>
                  this.handleChangeComplete(
                    this.hexToRgb(
                      customMuiTheme(this.state.hue).palette.blue
                        .backgroundColor
                    )
                  )
                }
              ></Button>
            </div>
            <div
              className={`${
                this.state.colorPicked === "green" ? "focused" : ""
              }`}
            >
              <Button
                variant="raised"
                style={customMuiTheme(this.state.hue).palette.green}
                className={classes.primary}
                onClick={() =>
                  this.handleChangeComplete(
                    this.hexToRgb(
                      customMuiTheme(this.state.hue).palette.green
                        .backgroundColor
                    )
                  )
                }
              ></Button>

            </div>
          </div>

          {/* <ContinuousSlider
            getHue={(hue) => this.getHue(hue)}
            hue={this.state.hue}
          /> */}
        </MuiThemeProvider>
      </div>
    );
  }
}

HuePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HuePicker);
