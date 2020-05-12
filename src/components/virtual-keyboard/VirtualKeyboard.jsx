import React, { useState } from "react";
import useEventListener from "./use-event-listener";
import "./VirtualKeyboard.css";

export const VirtualKeyboard = () => {
  const [keyboardValue, setKeyboardValue] = useState([]);
  const [currentKeyValue, setCurrentKeyValue] = useState(1);

  const keyNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const keyLetters = ["a", "b", "c", "d", "e", "f", "C", "Back", "OK"];


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
        }
      }
  };

  const changeKeys = (e) => {
      if (e.keyCode === 37 && currentKeyValue > 1) {
        setCurrentKeyValue(currentKeyValue - 1); // right
      } else if (e.keyCode === 39 && currentKeyValue < 19) {
        setCurrentKeyValue(currentKeyValue + 1); // left
      } else if (e.keyCode === 40 && currentKeyValue < 11) {
        // down
        setCurrentKeyValue(currentKeyValue + 10);
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
              className="key"
              value={key}
              style={{
                backgroundColor: index + 1 === currentKeyValue && "red",
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
              className="key"
              value={key}
              style={{
                backgroundColor: index + 11 === currentKeyValue && "red",
              }}
            >
              {key}
            </div>
          );
        })}
      </div>
      <div className="color">#{keyboardValue}</div>
    </div>
  );
};
