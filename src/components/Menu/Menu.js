import React, { useState, useEffect } from "react";
import "./Menu.css";
import Alphapicker from "../colorpicker/alphapicker";
import Twitterpicker from "../colorpicker/twitterpicker";
import { VirtualKeyboard } from "../virtual-keyboard/VirtualKeyboard.jsx";
const Menu = (props) => {
  let [indexFocusedItem, setIndexFocusedItem] = useState(0);
  let [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  let [currentPhotoID, setCurrentPhotoID] = useState(0);

  const exitKeyboard = () => {
    setShowVirtualKeyboard(false);
  };

  useEffect(() => {
    const nextImg = (numero) => {
      const nextImage = currentPhotoID + numero;
      if (nextImage < 0 || nextImage >= props.imageDB.length) {
        return;
      } else if (numero === 1) {
        if (currentPhotoID === props.imageDB.length-1) {
          setCurrentPhotoID(0);
          alert('hey')
        } else {
          setCurrentPhotoID(currentPhotoID++);
          props.changeBk(props.imageDB[currentPhotoID].url);
          console.log(currentPhotoID);
        }
      } else if (numero === -1) {
        setCurrentPhotoID(currentPhotoID--);
        props.changeBk(props.imageDB[currentPhotoID].url);
      }
    };

    const changeImageWithArrow = (e) => {
      e.preventDefault();
      if (props.imageDB) {
        if (e.keyCode === 39 && indexFocusedItem === 0) {
          nextImg(1);
        } else if (e.keyCode === 37 && indexFocusedItem === 0) {
          nextImg(-1);
        }
      }
    };

    const keyNavigate = (e) => {
      if (
        (e.keyCode === 13 && indexFocusedItem === 1) ||
        (e.keyCode === 13 && indexFocusedItem === 4)
      ) {
        if (showVirtualKeyboard === false) {
          setShowVirtualKeyboard(true);
        }
      }

            if (showVirtualKeyboard) {} else {
                if (e.keyCode === 38) {
                    if (indexFocusedItem > 0) {
                        indexFocusedItem--;

            setIndexFocusedItem(indexFocusedItem);
          }
        } else if (e.keyCode === 40) {
          if (indexFocusedItem < 8) {
            indexFocusedItem++;
            setIndexFocusedItem(indexFocusedItem);
          }
        }
      }
    };
    window.addEventListener("keydown", changeImageWithArrow);
    window.addEventListener("keydown", keyNavigate);

    return () => {
      window.removeEventListener("keydown", keyNavigate);
      window.removeEventListener("keydown", changeImageWithArrow);
    };
  }, [indexFocusedItem, showVirtualKeyboard]);

  return (
    <div className="Menu">
      <ul>
        <li className={`${indexFocusedItem === 0 ? "focused" : ""}`}>
          Background
        </li>
        <li className={`${indexFocusedItem === 1 ? "focused" : ""}`}>
          <Twitterpicker
            isText={false}
            previewColor={props.backgroundColor}
            getColor={(color, isText) => props.getColor(color, isText)}
            isKeyboardActive={showVirtualKeyboard}
            isActive={indexFocusedItem === 1 ? true : false}
            changeBk={props.changeBk}
          />
          {showVirtualKeyboard && indexFocusedItem === 1 ? (
            <VirtualKeyboard
            previewColor={props.backgroundColor}

              isText={false}
              getColor={(color, isText) => props.getColor(color, isText)}
              exitKeyboard={() => exitKeyboard()}
              changeBk={props.changeBk}
            />
          ) : (
            ""
          )}
        </li>
        <li className={`${indexFocusedItem === 2 ? "focused" : ""}`}>
          <Alphapicker
            isText={false}
            previewColor={props.backgroundColor}
            getColor={(color, isText) => props.getColor(color, isText)}
            isActive={indexFocusedItem === 2 ? true : false}
          />
        </li>
      </ul>
      <ul>
        <li className={`${indexFocusedItem === 3 ? "focused" : ""}`}>Text</li>
        <li className={`${indexFocusedItem === 4 ? "focused" : ""}`}>
          <Twitterpicker
            previewColor={props.colorText}
            isText={true}
            getColor={(color, isText) => props.getColor(color, isText)}
            isKeyboardActive={showVirtualKeyboard}
            isActive={indexFocusedItem === 4 ? true : false}
            changeBk={props.changeBk}
          />
          {showVirtualKeyboard && indexFocusedItem === 4 ? (
            <VirtualKeyboard
            previewColor={props.backgroundColor}
            changeBk={props.changeBk}

            isText={true}
            getColor={(color, isText) => props.getColor(color, isText)}
            exitKeyboard={() => exitKeyboard()}
            />
          ) : (
            ""
          )}
        </li>
        <li className={`${indexFocusedItem === 5 ? "focused" : ""}`}>
          <Alphapicker
            previewColor={props.colorText}
            isText={true}
            getColor={(color, isText) => props.getColor(color, isText)}
            isActive={indexFocusedItem === 5 ? true : false}
          />
        </li>
      </ul>
      <ul>
        <li className={`${indexFocusedItem === 6 ? "focused" : ""}`}>Fonts</li>
        <li className={`${indexFocusedItem === 7 ? "focused" : ""}`}>
          Font Size
        </li>
        <li className={`${indexFocusedItem === 8 ? "focused" : ""}`}>
          Font Style
        </li>
      </ul>
    </div>
  );
};
export default Menu;