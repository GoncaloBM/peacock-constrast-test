import React, { useState, useEffect } from "react";
import "./Menu.css";
import Alphapicker from "../colorpicker/alphapicker";
import Twitterpicker from "../colorpicker/twitterpicker";
import { VirtualKeyboard } from "../virtual-keyboard/VirtualKeyboard.jsx";
import HuePicker from "../huepicker/HuePicker";
import ContinuousSlider from "../huepicker/Slider";

const Menu = (props) => {
  let [indexFocusedItem, setIndexFocusedItem] = useState(-1);
  let [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  let [currentPhotoID, setCurrentPhotoID] = useState(0);
  let [hue, setStateHue] = useState(500);

  const exitKeyboard = () => {
    setShowVirtualKeyboard(false);
  };
  const getHue = (hue) => {
    setStateHue(hue);
  };



  useEffect(() => {
    const nextImg = (numero) => {
      const nextImage = currentPhotoID + numero;
      if (nextImage < 0 || nextImage >= props.imageDB.length) {
        return;
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
      if (
        (e.keyCode === 13 && newIndex === 1) ||
        (e.keyCode === 13 && newIndex === 4)
      ) {
        if (showVirtualKeyboard === false) {
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
          if (newIndex < 8 && newIndex > -1) {
            newIndex++;
            setIndexFocusedItem(newIndex);
          }
        }
      }
    };
    window.addEventListener("keydown", changeImageWithArrow);
    window.addEventListener("keydown", keyNavigate);
    //console.log(indexFocusedItem)
    return () => {
      window.removeEventListener("keydown", keyNavigate);
      window.removeEventListener("keydown", changeImageWithArrow);
    };
  }, [indexFocusedItem, showVirtualKeyboard, currentPhotoID, props]);

  return (
    <div className="Menu">
      <ul>
        <li className={`${indexFocusedItem === 0 ? "focused" : ""}`}>
          Background
        </li>
        <li className={`${indexFocusedItem === 1 ? "focused" : ""}`}>
          <HuePicker
            hue={hue}
            isText={false}
            previewColor={props.backgroundColor}
            getColor={(color, isText) => props.getColor(color, isText)}
            isKeyboardActive={showVirtualKeyboard}
            isActive={indexFocusedItem === 1 ? true : false}
            changeBk={props.changeBk}
            focusItem={indexFocusedItem}
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
          <ContinuousSlider
            getHue={() => getHue(hue)}
            hue={hue}
            focusItem={indexFocusedItem}
          />

          {/* <Alphapicker
            isText={false}
            previewColor={props.backgroundColor}
            getColor={(color, isText) => props.getColor(color, isText)}
            isActive={indexFocusedItem === 2 ? true : false}
          /> */}
        </li>
      </ul>
      <ul>
        <li className={`${indexFocusedItem === 3 ? "focused" : ""}`}>Text</li>
        <li className={`${indexFocusedItem === 4 ? "focused" : ""}`}>
          <HuePicker
            hue={hue}
            previewColor={props.colorText}
            isText={true}
            getColor={(color, isText) => props.getColor(color, isText)}
            isKeyboardActive={showVirtualKeyboard}
            isActive={indexFocusedItem === 4 ? true : false}
            changeBk={props.changeBk}
            focusItem={indexFocusedItem}
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
        <ContinuousSlider
            getHue={(hue) => getHue(hue)}
            hue={hue}
            focusItem={indexFocusedItem}
          />
          
          {/* <Alphapicker
            previewColor={props.colorText}
            isText={true}
            getColor={(color, isText) => props.getColor(color, isText)}
            isActive={indexFocusedItem === 5 ? true : false}
          /> */}
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
