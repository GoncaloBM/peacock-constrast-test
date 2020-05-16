import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {customMuiTheme} from "./MyTheme";
import "./HuePicker.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ContinuousSlider from "./Slider";

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
      hue: 100,
    };
  }

  setHue = (hue) => {
    this.setState({
      hue: hue,
    });
  };

  getHue = (hue) => {
    this.setHue(hue);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <ContinuousSlider
          getHue={(hue) => this.getHue(hue)}
          hue={this.state.hue}
        />
        <MuiThemeProvider theme={customMuiTheme(this.state.hue)}>
          <Button variant="raised">Default</Button>
          <Button
            variant="raised"
            style={customMuiTheme(this.state.hue).palette.yellow}
            className={classes.primary}
          >
            Yellow
          </Button>
          <Button
            variant="raised"
            style={customMuiTheme(this.state.hue).palette.purple}
            className={classes.primary}
          >
            Purple
          </Button>
          <Button
            variant="raised"
            style={customMuiTheme(this.state.hue).palette.orange}
            className={classes.primary}
          >
            Orange
          </Button>
          <Button
            variant="raised"
            style={customMuiTheme(this.state.hue).palette.red}
            className={classes.primary}
          >
            Red
          </Button>
          {/* <Button
            variant="raised"
            style={customMuiTheme(this.state.hue).palette.grey}
            className={classes.primary}
          >
            Grey
          </Button> */}
          <Button
            variant="raised"
            style={customMuiTheme(this.state.hue).palette.blue}
            className={classes.primary}
          >
            Blue
          </Button>
          <Button
            variant="raised"
            style={customMuiTheme(this.state.hue).palette.green}
            className={classes.primary}
          >
            Green
          </Button>
        </MuiThemeProvider>
      </>
    );
  }
}

HuePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HuePicker);
