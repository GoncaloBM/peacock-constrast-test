import React from "react";
import "./modal.css";
import useEventListener from "../virtual-keyboard/use-event-listener";

function Modal(props) {
    const backToApp = (e) => {
        if (props.onInformation) {
          //   console.log(e);
          if (e.keyCode === 13) {
            console.log("information");
            props.goToInformation();
          }
        }
      };
      useEventListener("keydown", backToApp);
  return (
    <div className={`${props.modalIsOpen ? "helpOpen" : "helpClosed"}`}>
      <div className="tittleMenu">Information</div>
      <p>Press 5 for full screen</p>
      <div className="exitButton"> Exit
</div>    </div>
  );
}
export default Modal;