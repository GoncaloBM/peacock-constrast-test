import React, {useEffect, useState} from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";

function App() {
  const [backgroundColor, setBackgroundColor] = useState('rgb(0,0,0,1)')
  const [colorText, setColorText] = useState('rgb(242,242,242, 1)')

  useEffect(() => {

    return () => {
    }
  }, [backgroundColor, colorText])

  const getColorText = (color) => {

    setColorText(color)

  } 

  const getBackgroundColor = (color) =>{
    console.log(color)
    let colorRGB = `rgb(${color.r},${color.g},${color.b},${color.a})` 
    setBackgroundColor(colorRGB)

  }

  return (
    <div className="App">
      <header className="header">This is header</header>
      <div className="wrapper">
        <div style={{backgroundColor: backgroundColor, color: colorText}} className="Board">This is board</div>

        <div className='menu'><Menu getBackgroundColor={(color)=>getBackgroundColor(color)} getColorText={()=>getColorText()} /></div>
      </div>

      <footer className="instructions"> Instructions </footer>
    </div>
  );
}

export default App;
