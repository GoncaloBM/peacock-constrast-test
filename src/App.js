import React from "react";
import Twitterpicker from "./components/colorpicker/twitterpicker";
import Alphapicker from "./components/colorpicker/alphapicker";

import "./App.css";
import Menu from "./components/Menu/Menu";
import { VirtualKeyboard } from "./components/virtual-keyboard/VirtualKeyboard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeComponent: "",
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

  // to define which component is active
  keydown = (event) => {
    let state = this.state.activeComponent;
    if (event.key === "ArrowUp") {
      if (state === "") {
        this.setState({
          activeComponent: "font",
        });
      } else if (state === "font") {
        this.setState({
          activeComponent: "text",
        });
      } else if (state === "text") {
        this.setState({
          activeComponent: "background",
        });
      } else if (state === "background") {
        this.setState({
          activeComponent: "font",
        });
      }
    } else if (event.key === "ArrowDown") {
      if (state === "") {
        this.setState({
          activeComponent: "background",
        });
      } else if (state === "background") {
        this.setState({
          activeComponent: "backgroundAlpha",
        });
      } else if (state === "backgroundAlpha") {
        this.setState({
          activeComponent: "font",
        });
      } else if (state === "text") {
        this.setState({
          activeComponent: "font",
        });
      } else if (state === "font") {
        this.setState({
          activeComponent: "background",
        });
      }
    }
  };
  render() {
    return (
      <div className="App">
        <Twitterpicker activeComponent={this.state.activeComponent} />
        <Alphapicker activeComponent={this.state.activeComponent} />
        <VirtualKeyboard activeComponent={this.state.activeComponent} />
        <Menu activeComponent={this.state.activeComponent} />
      </div>
    );
  }
}
export default App;
