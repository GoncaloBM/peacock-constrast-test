import React, { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let [backgroundColor, setBackgroundColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  let [colorText, setColorText] = useState({
    r: 242,
    g: 242,
    b: 242,
    a: 1,
  });

  const [bkImage, setBkImage] = useState("");
  const [imageDB, setImageDB] = useState("");

  useEffect(() => {
    fetchImages();
    return () => {};
  }, [setColorText, setBackgroundColor, setBkImage]);

  let getColor = (color, isText) => {
    if (isText) {
      setColorText(color);
    } else {
      setBackgroundColor(color);
    }
  };

  const fetchImages = () => {
    const dbUrl = "/images/images.json";
    axios.get(dbUrl).then((res) => {
      setImageDB(res.data);
    });
  };

  const changeBk = (bkUrl) => {
    setBkImage(bkUrl);
  };

  const Contrast = () =>{

    return(
      <>
    <div className="wrapper">
    <div
      style={{
        backgroundColor: `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`,
        color: `rgb(${colorText.r},${colorText.g},${colorText.b},${colorText.a})`,
        backgroundImage: `url(${bkImage})`,
      }}
      className="Board"
    >
      This is board
    </div>

    <div className="menu">
      <Menu
        colorText={colorText}
        backgroundColor={backgroundColor}
        getColor={(color, isText) => getColor(color, isText)}
        changeBk={changeBk}
        imageDB={imageDB}
      />
    </div>
  </div>
  <footer className="instructions"> Instructions </footer>
  </>
    )
    
  }

  return (
    <Router>
    <div className="App">

      <header className="header">
    
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            
            <li>
              <Link to="/contrast">Contrast</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        
      </header>

    </div>
    <Switch>
         
          
          <Route path="/about">
          <h1>This is about us</h1>
          </Route>
          <Route path="/contrast">
            <Contrast />

          </Route>
           <Route path="/">
            <h1>This is Home</h1>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
