import React from "react";
import "./information.css";
import useEventListener from "../virtual-keyboard/use-event-listener";

function Information(props) {
  const backToMenu = (e) => {
    if (props.onInformation) {
      //   console.log(e);
      if (e.keyCode === 13) {
        console.log("information");
        props.goToInformation();
      }
    }
  };
  useEventListener("keydown", backToMenu);

  return (
    <div className="information">
      <h1> BackGround Color {props.backgroundColor} </h1>
      <h1> Color Text {props.colorText} </h1>
      <h1> Font Size {props.fontSize} </h1>
      <h1> Font Style {props.fontStyle} </h1>
      <h1 className="focus"> Exit</h1>
    </div>
  );
}

export default Information;
