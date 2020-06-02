import React, { useState, useEffect } from "react";
import "./Menu.css";
import { VirtualKeyboard } from "../virtual-keyboard/VirtualKeyboard.jsx";
import HuePicker from "../huepicker/HuePicker";

const Menu = (props) => {
  let [indexFocusedItem, setIndexFocusedItem] = useState(-1);
  let [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  let [showTextPositionTool, setShowTextPositionTool] = useState(false);

  const exitKeyboard = () => {
    setShowVirtualKeyboard(false);
  };

  useEffect(() => {
    const goGal = (e) => {
      if (indexFocusedItem === 7 && e.keyCode === 13) {
        props.goToGalery();
      }
    };
    const changeSizeFont = (e) => {
      if (indexFocusedItem === 4) {
        if (e.keyCode === 13) {
          setShowTextPositionTool(!showTextPositionTool);
        }
      }
      if (indexFocusedItem === 5) {
        if (e.keyCode === 39) {
          props.changeFontSizeState(0.1);
        } else if (e.keyCode === 37) {
          props.changeFontSizeState(-0.1);
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
          if (newIndex < 7 && newIndex > -1) {
            newIndex++;
            setIndexFocusedItem(newIndex);
          }
        }
      }
    };
    window.addEventListener("keydown", goGal);
    window.addEventListener("keydown", keyNavigate);
    window.addEventListener("keydown", changeSizeFont);
    //console.log(indexFocusedItem)
    return () => {
      window.removeEventListener("keydown", goGal);
      window.removeEventListener("keydown", keyNavigate);
      window.removeEventListener("keydown", changeSizeFont);
    };
  }, [indexFocusedItem, showVirtualKeyboard, props, showTextPositionTool]);

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
      <ul>
        <li
          className={` title-menu ${indexFocusedItem === 7 ? "focused" : ""}`}
        >
          Gallery
        </li>
      </ul>
    </div>
  );
};
export default Menu;
