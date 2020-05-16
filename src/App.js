import React, { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import axios from "axios";

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

  return (
    <div className="App">

      <header className="header">This is header</header>
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
    </div>
  );
}

export default App;
