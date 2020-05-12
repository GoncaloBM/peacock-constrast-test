import React from 'react';
import './App.css';
import Menu from "./components/Menu/Menu"
import { VirtualKeyboard } from "./components/virtual-keyboard/VirtualKeyboard";

function App() {
  return (
    <div className="App">
      <VirtualKeyboard />
    <Menu />
    </div>
  );
}

export default App;
