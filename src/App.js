import React from 'react';
import Twitterpicker from "./components/colorpicker/twitterpicker"
import Alphapicker from "./components/colorpicker/alphapicker"

import './App.css';

function App() {
  return (
    <div className="App">
     <Twitterpicker></Twitterpicker>
     <Alphapicker></Alphapicker>
    </div>
  );
}

export default App;
