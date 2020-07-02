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
      <div className="tittleMenu">Help</div>
      <p>
        Press <span style={{ fontWeight: "bold" , fontSize:'1.2rem'}}>5</span> for Full Screen
      </p>
      <p>
        <span style={{ fontWeight: "bold", fontSize:'1.2rem' }}>Arrows</span> to navigate through the
        App
      </p>
      <p>
        Press <span style={{ fontWeight: "bold" , fontSize:'1.2rem'}}>OK</span> to select the
        desired option
      </p>
      <div className="exitButton"> Exit</div>{" "}
    </div>
  );
}
export default Modal;
