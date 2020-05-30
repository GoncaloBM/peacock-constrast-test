import React, { useState, useEffect } from "react";
import "./Menu.css";
import Alphapicker from "../colorpicker/alphapicker";
import Twitterpicker from "../colorpicker/twitterpicker";
import { VirtualKeyboard } from "../virtual-keyboard/VirtualKeyboard.jsx";
import HuePicker from "../huepicker/HuePicker";

const Menu = (props) => {
  let [indexFocusedItem, setIndexFocusedItem] = useState(-1);
  let [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  let [currentPhotoID, setCurrentPhotoID] = useState(0);

  let [showTextPositionTool, setShowTextPositionTool] = useState(false);

  const exitKeyboard = () => {
    setShowVirtualKeyboard(false);
  };

  useEffect(() => {
    const changeSizeFont = (e) => {
      if (indexFocusedItem === 4) {
        if (e.keyCode === 13) {
          setShowTextPositionTool(!showTextPositionTool);
        }
      }
      if (indexFocusedItem === 5) {
        if (e.keyCode === 39) {
          props.changeFontSizeState(1);
        } else if (e.keyCode === 37) {
          props.changeFontSizeState(-1);
        }
      }
      if (indexFocusedItem === 6) {
        if (e.keyCode === 39) {
          props.changeFontStyleState(1);
        } else if (e.keyCode === 37) {
          props.changeFontStyleState(-1);
        }
      }
    };

    const nextImg = (numero) => {
      const nextImage = currentPhotoID + numero;
      if (nextImage > props.imageDB.length) {
        setCurrentPhotoID(0);
        props.changeBk(props.imageDB[0].url);
      } else if (nextImage < 0) {
        setCurrentPhotoID(props.imageDB.length - 1);
        props.changeBk(props.imageDB[props.imageDB.length - 1].url);
      } else {
        setCurrentPhotoID(currentPhotoID + numero);
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
      //console.log(indexFocusedItem);
      let newIndex = indexFocusedItem;
      if (showTextPositionTool === true) {
        return props.changeTextPosition(e.keyCode);
      }
      if (
        (e.keyCode === 13 && newIndex === 1) ||
        (e.keyCode === 13 && newIndex === 3)
      ) {
        if (showVirtualKeyboard === false) {
          console.log("enter");
          setShowVirtualKeyboard(true);
        }
      }

      if (showVirtualKeyboard) {
      } else {
        if (e.keyCode === 38) {
          if (newIndex >= 0) {
            newIndex--;
            // console.log(newIndex);
            // console.log("a subir");
            setIndexFocusedItem(newIndex);
          }
          if (newIndex === -1) {
            // console.log("vai para navbar");
            setIndexFocusedItem(newIndex);
            //console.log('leaving menu');
            props.backToNavbar(true);
          }
        } else if (e.keyCode === 40) {
          if (newIndex === -1) {
            props.backToNavbar(false);
            setIndexFocusedItem(0);
          }
          if (newIndex < 6 && newIndex > -1) {
            newIndex++;
            setIndexFocusedItem(newIndex);
          }
        }
      }
    };
    window.addEventListener("keydown", changeImageWithArrow);
    window.addEventListener("keydown", keyNavigate);
    window.addEventListener("keydown", changeSizeFont);
    //console.log(indexFocusedItem)
    return () => {
      window.removeEventListener("keydown", keyNavigate);
      window.removeEventListener("keydown", changeImageWithArrow);
      window.removeEventListener("keydown", changeSizeFont);
    };
  }, [
    indexFocusedItem,
    showVirtualKeyboard,
    currentPhotoID,
    props,
    showTextPositionTool,
  ]);

  return (
    <div className="Menu">
      <ul className="category-menu">
        <li className={`title-menu ${indexFocusedItem === 0 ? "focused" : ""}`}>
          Background
        </li>
        <li
          className={`color-keyboard ${
            indexFocusedItem === 1 ? "focused" : ""
          }`}
        >
          <HuePicker
            showVirtualKeyboard={showVirtualKeyboard}
            isText={false}
            previewColor={props.backgroundColor}
            getColor={(color, isText) => props.getColor(color, isText)}
            isKeyboardActive={showVirtualKeyboard}
            isActive={indexFocusedItem === 1 ? true : false}
            changeBk={props.changeBk}
            focusItem={indexFocusedItem}
            picker={props.picker}
          />
          
          {showVirtualKeyboard && indexFocusedItem === 1 ? (
            <div className="keybo">
              <VirtualKeyboard
                previewColor={props.backgroundColor}
                isText={false}
                getColor={(color, isText) => props.getColor(color, isText)}
                exitKeyboard={() => exitKeyboard()}
                changeBk={props.changeBk}
              />
            </div>
          ) : (
            ""
          )}
        </li>
      </ul>
      <ul className="category-menu">
        <li
          className={` title-menu ${indexFocusedItem === 2 ? "focused" : ""}`}
        >
          Text
        </li>{" "}
        <li
          className={`color-keyboard ${
            indexFocusedItem === 3 ? "focused" : ""
          }`}
        >
            <HuePicker
              showVirtualKeyboard={showVirtualKeyboard}
              isText={true}
              previewColor={props.backgroundColor}
              getColor={(color, isText) => props.getColor(color, isText)}
              isKeyboardActive={showVirtualKeyboard}
              isActive={indexFocusedItem === 3 ? true : false}
              changeBk={props.changeBk}
              focusItem={indexFocusedItem}
            />
          {showVirtualKeyboard && indexFocusedItem === 3 ? (
            <div className="keybo">
              <VirtualKeyboard
                previewColor={props.backgroundColor}
                changeBk={props.changeBk}
                isText={true}
                getColor={(color, isText) => props.getColor(color, isText)}
                exitKeyboard={() => exitKeyboard()}
              />
            </div>
          ) : (
            ""
          )}
        </li>
      </ul>
      <ul className="category-menu">
        <li
          className={` title-menu ${indexFocusedItem === 4 ? "focused" : ""}`}
        >
          Fonts
        </li>
        <li className={`${indexFocusedItem === 5 ? "focused" : ""}`}>
          Font Size
        </li>
        <li className={`${indexFocusedItem === 6 ? "focused" : ""}`}>
          Font Style
        </li>
      </ul>
    </div>
  );
};
export default Menu;
