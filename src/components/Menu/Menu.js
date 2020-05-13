import React, { useState, useEffect } from "react";
import "./Menu.css";
import Alphapicker from "../colorpicker/alphapicker";
import Twitterpicker from "../colorpicker/twitterpicker";
import {VirtualKeyboard} from "../virtual-keyboard/VirtualKeyboard.jsx";
const Menu = (props) => {
  let [indexFocusedItem, setIndexFocusedItem] = useState(0);
  let [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);

  const exitKeyboard = () =>{
    // console.log('joao')
    setShowVirtualKeyboard(false)
  }
  

  useEffect(() => {
    const keyNavigate = (e) => {
      if ((e.keyCode === 13 && indexFocusedItem ===1) || (e.keyCode === 13 && indexFocusedItem ===4)) {
        if(showVirtualKeyboard === false){
          setShowVirtualKeyboard(true)
        }
        
      }

      if(showVirtualKeyboard){
      }else{
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
    window.addEventListener("keydown", keyNavigate);
    return () => {
      window.removeEventListener("keydown", keyNavigate);
    };
  }, [indexFocusedItem, showVirtualKeyboard]);

  return (
    <div className="Menu">
      <ul>
        <li className={`${indexFocusedItem === 0 ? "focused" : ""}`}>
          Background
        </li>
        <li className={`${indexFocusedItem === 1 ? "focused" : ""}`}>
          <Twitterpicker getBackgroundColor={(color)=>props.getBackgroundColor(color)} isKeyboardActive= {showVirtualKeyboard} isActive={indexFocusedItem === 1 ? true : false}/>
          {showVirtualKeyboard && indexFocusedItem === 1 ? <VirtualKeyboard getBackgroundColor={(color)=>props.getBackgroundColor(color)}
           exitKeyboard={()=>exitKeyboard()} /> : "" }
        </li>
        <li className={`${indexFocusedItem === 2 ? "focused" : ""}`}>
          <Alphapicker isActive={indexFocusedItem === 2 ? true : false} />
        </li>
      </ul>
      <ul>
        <li className={`${indexFocusedItem === 3 ? "focused" : ""}`}>Text</li>
        <li className={`${indexFocusedItem === 4 ? "focused" : ""}`}>
          <Twitterpicker isKeyboardActive= {showVirtualKeyboard} isActive={indexFocusedItem === 4 ? true : false}/>
          {showVirtualKeyboard && indexFocusedItem ===4 ? <VirtualKeyboard exitKeyboard={()=>exitKeyboard()} /> : "" }
        </li>
        <li className={`${indexFocusedItem === 5 ? "focused" : ""}`}>
          <Alphapicker isActive={indexFocusedItem === 5 ? true : false} />
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
