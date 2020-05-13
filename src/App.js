import React, { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";

function App() {
  const [backgroundColor, setBackgroundColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [colorText, setColorText] = useState({ r: 242, g: 242, b: 242, a: 1 });
  useEffect(() => {
    return () => {};
  }, [backgroundColor, colorText]);

  const getColor = (color, isText) => {
    if (isText){
      setColorText(color)
    }else{
      setBackgroundColor(color);
    }
    
  };

  return (
    <div className="App">
      <header className="header">This is header</header>
      <div className="wrapper">
        <div
          style={{
            backgroundColor: `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`,
            color:  `rgb(${colorText.r},${colorText.g},${colorText.b},${colorText.a})`,
          }}
          className="Board"
        >
          This is board
        </div>

        <div className="menu">
          <Menu
            
            colorText = {colorText}
            backgroundColor={backgroundColor}
            getColor={(color, isText) => getColor(color, isText)}
          />
        </div>
      </div>

      <footer className="instructions"> Instructions </footer>
    </div>
  );
}

export default App;
