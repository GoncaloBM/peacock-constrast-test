import React, { useState } from "react";
import useEventListener from "./use-event-listener";
import "./VirtualKeyboard.css";

export const VirtualKeyboard = (props) => {
  const isText = props.isText;
  const getColor = props.getColor;
  const exitKeyboard = props.exitKeyboard;
  const [keyboardValue, setKeyboardValue] = useState([]);
  const [currentKeyValue, setCurrentKeyValue] = useState(1);

  const keyNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const keyLetters = ["A", "B", "C", "D", "E", "F", "C", "Back", "OK", "Exit"];

  //after press ok on keyboard sets background with the value
  const sendColorFromVirtualKeyboard = (color) => {
    console.log(isText);
    if (!isText) {
      props.changeBk("");
    }
    getColor(color, isText);  
  };

  // convert hex from keyboard to rgb
  // function hexToRgb(hex) {
  //   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //   return result ? {
  //     r: parseInt(result[1], 16),
  //     g: parseInt(result[2], 16),
  //     b: parseInt(result[3], 16)
  //   } : null;
  // }

  const insertCharacter = (e) => {
    if (e.keyCode === 13) {
      if (currentKeyValue < 11 && keyboardValue.length <= 5) {
        setKeyboardValue((keyboardValue) =>
          keyboardValue.concat(keyNumbers[currentKeyValue - 1])
        );
      } else if (
        currentKeyValue > 10 &&
        currentKeyValue < 17 &&
        keyboardValue.length <= 5
      ) {
        setKeyboardValue((keyboardValue) =>
          keyboardValue.concat(keyLetters[currentKeyValue - 11])
        );
      } else if (currentKeyValue === 17 && keyboardValue.length <= 6) {
        // Key C
        setKeyboardValue([]);
      } else if (currentKeyValue === 18 && keyboardValue.length <= 6) {
        // delete last value
        let newValue = keyboardValue.slice(0, -1);
        setKeyboardValue(newValue);
      } else if (currentKeyValue === 19 && keyboardValue.length === 6) {
        //button ok
        //  let color = hexToRgb(keyboardValue.join(""));
        let color = `#${keyboardValue.join("")}`;
        //  let previewColor = {...props.previewColor}
        //  color.a = previewColor.a;
        sendColorFromVirtualKeyboard(color);
        exitKeyboard();
      } else if (currentKeyValue === 20) {
        //button Exit
        exitKeyboard();
      }
    }
  };

  const changeKeys = (e) => {
    if (e.keyCode === 37 && currentKeyValue > 1) {
      setCurrentKeyValue(currentKeyValue - 1); // right
    } else if (e.keyCode === 39 && currentKeyValue < 20) {
      setCurrentKeyValue(currentKeyValue + 1); // left
    } else if (e.keyCode === 40 && currentKeyValue < 10) {
      // down
      setCurrentKeyValue(currentKeyValue + 10);
    } else if (e.keyCode === 40 && currentKeyValue === 10) {
      setCurrentKeyValue(19); // When pressing down on 9, it will go to OK
    } else if (e.keyCode === 38 && currentKeyValue > 10) {
      // up

      setCurrentKeyValue(currentKeyValue - 10);
    }
  };

  useEventListener("keydown", changeKeys);
  useEventListener("keydown", insertCharacter);

  return (
    <div className="keyboard">
      <div className="keyboard-line">
        {keyNumbers.map((key, index) => {
          return (
            <div
              key={index}
              className="key"
              value={key}
              style={{
                backgroundColor: index + 1 === currentKeyValue && "red",
                color: index + 1 === currentKeyValue && "white",
              }}
            >
              {key}
            </div>
          );
        })}
      </div>
      <div className="keyboard-line">
        {keyLetters.map((key, index) => {
          return (
            <div
              key={index}
              className="key"
              value={key}
              style={{
                backgroundColor: index + 11 === currentKeyValue && "red",
                color: index + 11 === currentKeyValue && "white",
              }}
            >
              {key}
            </div>
          );
        })}
      </div>
      <div className="color">
        <div className="hashtag">#</div>
        <div className="hexa" style={{ color: `#${keyboardValue.join("")}` }}>
          {keyboardValue}
        </div>
      </div>
    </div>
  );
};
