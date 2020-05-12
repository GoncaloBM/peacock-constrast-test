import React, { useState } from "react";
import useEventListener from "./use-event-listener";
import "./VirtualKeyboard.css";

export const VirtualKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [keyboardValue, setKeyboardValue] = useState([]);
  const [currentKeyValue, setCurrentKeyValue] = useState(0);

  const keyNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const keyLetters = ["a", "b", "c", "d", "e", "f", "C", "Back", "OK"];

  const toggleKeyboard = (e) => {
    if (!keyboardVisible && e.keyCode === 37) {
      setKeyboardVisible(true);
      setCurrentKeyValue(10);
    }
  };

  const insertCharacter = (e) => {
    if (keyboardVisible) {
      if (e.keyCode === 13) {
        if (currentKeyValue < 11) {
          setKeyboardValue((keyboardValue) =>
            keyboardValue.concat(keyNumbers[currentKeyValue - 1])
          );
        } else if (currentKeyValue > 10) {
            setKeyboardValue((keyboardValue) =>
            keyboardValue.concat(keyLetters[currentKeyValue - 11])
          );
        }
      }
    }
  };

  const changeKeys = (e) => {
    if (keyboardVisible) {
      if (e.keyCode === 37) {
        setCurrentKeyValue(currentKeyValue - 1);
      } else if (e.keyCode === 39) {
        setCurrentKeyValue(currentKeyValue + 1);
      } else if (e.keyCode === 40 && currentKeyValue < 11) {
        setCurrentKeyValue(currentKeyValue + 10);
      } else if (e.keyCode === 38 && currentKeyValue > 10) {
        setCurrentKeyValue(currentKeyValue - 10);
      }
    }
  };

  //   useEventListener("keydown", toggleKeyboard);
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
