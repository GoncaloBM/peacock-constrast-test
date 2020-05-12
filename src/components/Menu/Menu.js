import React, { useState, useEffect } from "react";
import "./Menu.css";

const Menu = () => {
  let [indexFocusedItem, setIndexFocusedItem] = useState(0);

  

  useEffect(() => {
    const keyNavigate = (e) => {
        if(e.keyCode=== 38){
            console.log('Up ')
            if(indexFocusedItem >0){
              console.log(indexFocusedItem)
              indexFocusedItem--
    
                setIndexFocusedItem(indexFocusedItem)
                console.log(indexFocusedItem)

            }
    
        }else if(e.keyCode === 40){
            console.log('Down')
            if(indexFocusedItem <8){
              console.log(indexFocusedItem)
                indexFocusedItem++
              setIndexFocusedItem(indexFocusedItem)
              console.log(indexFocusedItem)
    
          }
        }
    }
    window.addEventListener("keydown", keyNavigate);
    return () => {
        window.removeEventListener("keydown", keyNavigate);

    };
  }, [indexFocusedItem]);

  

  return (
    <div className="Menu">
      <ul>
        <li className={`${indexFocusedItem === 0 ? "focused" : ""}`}>Background</li>
        <li className={`${indexFocusedItem === 1 ? "focused" : ""}`}>Twitter</li>
        <li className={`${indexFocusedItem === 2 ? "focused" : ""}`}>Alpha Channel</li>
      </ul>
      <ul>
        <li className={`${indexFocusedItem === 3 ? "focused" : ""}`}>Text</li>
        <li className={`${indexFocusedItem === 4 ? "focused" : ""}`}>Twitter</li>
        <li className={`${indexFocusedItem === 5 ? "focused" : ""}`}>Alpha Channel</li>
      </ul>
      <ul>
        <li className={`${indexFocusedItem === 6 ? "focused" : ""}`}>Fonts</li>
        <li className={`${indexFocusedItem === 7 ? "focused" : ""}`}>Font Size</li>
        <li className={`${indexFocusedItem === 8 ? "focused" : ""}`}>Font Style</li>
      </ul>
    </div>
  );
};
export default Menu;
