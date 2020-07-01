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
      <div className="informationalign">
        <p>
          <span class="highlight">BackGround Color:</span>
          {props.backgroundColor}
        </p>
        <p>
        <span class="highlight">Color Text:</span> {props.colorText}
        </p>
        <p>
        <span class="highlight">Font Size:</span>
          {props.fontSize}
        </p>
        <p>
        <span class="highlight">Font Style:</span> {props.fontStyle}
        </p>
      </div>
      <div className="focus"> Exit</div>
    </div>
  );
}

export default Information;
