import React from 'react';
import Colorpicker from "./components/colorpicker/colorpicker"
import './App.css';
import Menu from "./components/Menu/Menu"
import { VirtualKeyboard } from "./components/virtual-keyboard/VirtualKeyboard";

function App() {
  return (
    <div className="App">
     <Colorpicker></Colorpicker>
      <VirtualKeyboard />
    <Menu />
    </div>
  );
}

export default App;
