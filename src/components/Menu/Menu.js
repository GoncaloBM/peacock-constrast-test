import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";
import { VirtualKeyboard } from "../virtual-keyboard/VirtualKeyboard.jsx";
import HuePicker from "../huepicker/HuePicker";
import { flexbox } from "@material-ui/system";

const Menu = (props) => {
  let [indexFocusedItem, setIndexFocusedItem] = useState(
    props.fromGalery === true ? 7 : -1
  );
  let [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);

  const exitKeyboard = () => {
    setShowVirtualKeyboard(false);
  };

  useEffect(() => {
    const goGal = (e) => {
      if (indexFocusedItem === 5 && e.keyCode === 13) {
        props.goToGalery();
      }
    };
    const changeSizeFont = (e) => {
      if (indexFocusedItem === 4) {
        if (e.keyCode === 13) {
          props.getTextPositionTool();
        }
      }
      if (indexFocusedItem === 2) {
        if (e.keyCode === 39) {
          props.changeFontSizeState(0.1);
        } else if (e.keyCode === 37) {
          props.changeFontSizeState(-0.1);
        }
      }
      if (indexFocusedItem === 3) {
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
      if (props.showTextPositionTool === true) {
        return props.changeTextPosition(e.keyCode);
      }
      if (
        (e.keyCode === 13 && newIndex === 0) ||
        (e.keyCode === 13 && newIndex === 1)
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
          if (newIndex < 5 && newIndex > -1) {
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
  }, [
    indexFocusedItem,
    showVirtualKeyboard,
    props,
    props.showTextPositionTool,
    props.fromGalery,
  ]);

  const menuSelector = (index) => {
    if (index === 0) {
      return 0;
    } else if (index === 1) {
      return 25;
    } else if (index === 2 || index === 3 || index === 4) {
      return 50;
    } else if (index === 5) {
      return 75;
    } else {
      return;
    }
  };

  const fontSelector = (index) => {
    if (index === 2) {
      return 45;
    } else if (index === 3) {
      return 60;
    } else if (index === 4) {
      return 75;
    }
  };

  return (
    <div className="Menu">
      {indexFocusedItem > -1 && (
        <ul
          className="menu-selector"
          style={{ top: `${menuSelector(indexFocusedItem)}%` }}
        ></ul>
      )}

      <ul className="category-menu">
        {/* <li className={`title-menu ${indexFocusedItem === 0 ? "focused" : ""}`}>
          Background
        </li> */}
        <li className="title-menu">Background</li>
        <li
          className={`color-keyboard ${
            indexFocusedItem === 0 ? "focused" : ""
          }`}
        >
          <HuePicker
            showVirtualKeyboard={showVirtualKeyboard}
            isText={false}
            previewColor={props.backgroundColor}
            getColor={(color, isText) => props.getColor(color, isText)}
            isKeyboardActive={showVirtualKeyboard}
            isActive={indexFocusedItem === 0 ? true : false}
            changeBk={props.changeBk}
            focusItem={indexFocusedItem}
            picker={props.picker}
          />

          {showVirtualKeyboard && indexFocusedItem === 0 ? (
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
        {/* <li
          className={` title-menu ${indexFocusedItem === 1 ? "focused" : ""}`}
        >
          Text
        </li>{" "} */}
        <li className="title-menu">Text</li>{" "}
        <li
          className={`color-keyboard ${
            indexFocusedItem === 1 ? "focused" : ""
          }`}
        >
          <HuePicker
            showVirtualKeyboard={showVirtualKeyboard}
            isText={true}
            previewColor={props.backgroundColor}
            getColor={(color, isText) => props.getColor(color, isText)}
            isKeyboardActive={showVirtualKeyboard}
            isActive={indexFocusedItem === 1 ? true : false}
            changeBk={props.changeBk}
            focusItem={indexFocusedItem}
          />
          {showVirtualKeyboard && indexFocusedItem === 1 ? (
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
        {(indexFocusedItem === 2 ||
          indexFocusedItem === 3 ||
          indexFocusedItem === 4) && (
          <li
            className="font-selector"
            style={{ top: `${fontSelector(indexFocusedItem)}%` }}
          ></li>
        )}

        {/* <li
          className={` title-menu ${indexFocusedItem === 4 ? "focused" : ""}`}
        >
          Fonts
        </li> */}
        <li className="title-menu">Fonts</li>
        <li className={`${indexFocusedItem === 2 ? "focused" : ""} font-sub`}>
          Font Size
        </li>
        <li className={`${indexFocusedItem === 3 ? "focused" : ""} font-sub`}>
          Font Style
        </li>
        <li className={`${indexFocusedItem === 4 ? "focused" : ""} font-sub`}>
          Font Move
        </li>
      </ul>

      <ul className="category-menu">
        <li
          className={` title-menu ${indexFocusedItem === 5 ? "focused" : ""}`}
        >
          Gallery
        </li>
      </ul>
    </div>
  );
};
export default Menu;
