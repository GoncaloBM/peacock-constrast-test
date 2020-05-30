import React, { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import "./fonts/fonts.css";
import FileUpload from "./components/fileUploader/fileUpload";
import TextDisplay from "./components/TextDisplay/TextDisplay";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Contrast = ({
  backgroundColor,
  colorText,
  bkImage,
  returnToNavBar,
  getColor,
  imageDB,
  changeBk,
  fontSize,
  fontStyle,
  textPosition,
  changeFontSizeState,
  changeFontStyleState,
  changeTextPosition,
  picker,
}) => {
  return (
    <>
      <div className="wrapper">
        <div className="wrapper-board">
          <div
            style={{
              backgroundColor: `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`,
              color: `rgb(${colorText.r},${colorText.g},${colorText.b},${colorText.a})`,
              backgroundImage: `url(${bkImage})`,
            }}
            className="Board"
          >
            <TextDisplay
              fontSize={fontSize}
              textPosition={textPosition}
              fontStyle={fontStyle}
            />
          </div>
        </div>

        <div className="menu">
          <Menu
            backToNavbar={returnToNavBar}
            colorText={colorText}
            backgroundColor={backgroundColor}
            getColor={getColor}
            changeBk={changeBk}
            imageDB={imageDB}
            fontSize={fontSize}
            changeFontSizeState={changeFontSizeState}
            changeFontStyleState={changeFontStyleState}
            changeTextPosition={changeTextPosition}
            picker={picker}
          />
        </div>
      </div>
      <footer className="instructions"> Instructions </footer>
    </>
  );
};

function App(props) {
  let differentFontStyles = [
    "div",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "i",
    "b",
  ];
  let startetTextPosition = { top: 0, right: 0 };
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

  const [fontSize, setfontSize] = useState(100);
  const [fontStyle, setFontStyle] = useState(differentFontStyles[0]);
  const [textPosition, setTextPosition] = useState(startetTextPosition);

  const getWindowLocation = () => {
    if (window.location.pathname === "/") {
      return 0;
    } else if (window.location.pathname === "/contrast") {
      return 1;
    } else if (window.location.pathname === "/about") {
      return 2;
    } else if (window.location.pathname === "/contrast2") {
      return 3;
    }
  };

  let [linkIndex, setLinkIndex] = useState(getWindowLocation());
  let [navBarNavigating, setNavBarNavigating] = useState(true);
 /*  let[ShowTextPositionTool, setShowTextPositionTool] = useState(false);
  let [contrast, setContrast] = useState(false); */

  const [bkImage, setBkImage] = useState("");
  const [imageDB, setImageDB] = useState("");

  useEffect(() => {
    fetchImages();

    const navBarNavigation = (e) => {
      if (navBarNavigating) {
        let newIndex = linkIndex;

        if (e.keyCode === 13 && linkIndex === 1) {
          if (window.location.pathname !== "/contrast") {
            window.location.pathname = "/contrast";
          }
        }
        if (e.keyCode === 13 && linkIndex === 2) {
          if (window.location.pathname !== "/about") {
            window.location.pathname = "/about";
          }
        }
        if (e.keyCode === 13 && linkIndex === 0) {
          if (window.location.pathname !== "/") {
            window.location.pathname = "/";
          }
        }
        if (e.keyCode === 13 && linkIndex === 3) {
          if (window.location.pathname !== "/contrast2") {
            window.location.pathname = "/contrast2";
          }
        }

        if (e.keyCode === 37 && linkIndex > 0) {
          newIndex--;
          setLinkIndex(newIndex);
        }

        if (e.keyCode === 39 && linkIndex < 3) {
          newIndex++;
          setLinkIndex(newIndex);
        }
      }
    };
    window.addEventListener("keydown", navBarNavigation);
    return () => {
      window.removeEventListener("keydown", navBarNavigation);
    };
  }, [
    colorText,
    backgroundColor,
    bkImage,
    linkIndex,
    navBarNavigating,
    fontSize,
    fontStyle,
  ]);

  let getColor = (color, isText) => {
    if (isText) {
      setColorText(color);
    } else {
      setBackgroundColor(color);
    }
  };

  const fetchImages = () => {
    const dbUrl = `http://joaoreberti.tech:5001/getpictures`;
    axios.get(dbUrl).then((res) => {
      setImageDB(res.data);
    });
  };

  const changeBk = (bkUrl) => {
    setBkImage(bkUrl);
    // console.log(bkUrl);
  };

  const returnToNavBar = (returningToNavBar) => {
    if (returningToNavBar) {
      setLinkIndex(2);
      setNavBarNavigating(true);
    } else {
      // console.log("a descer");
      setNavBarNavigating(false);
      setLinkIndex(-1);
    }
  };

  const changeFontSizeState = (increaseOrDecrease) => {
    setfontSize(fontSize + increaseOrDecrease);
  };

  const changeFontStyleState = (increaseOrDecrease) => {
    if (
      differentFontStyles.indexOf(fontStyle) < differentFontStyles.length - 1 &&
      increaseOrDecrease === 1
    ) {
      setFontStyle(
        differentFontStyles[differentFontStyles.indexOf(fontStyle) + 1]
      );
    } else if (
      differentFontStyles.indexOf(fontStyle) ===
        differentFontStyles.length - 1 &&
      increaseOrDecrease === 1
    ) {
      setFontStyle(differentFontStyles[0]);
    } else if (
      differentFontStyles.indexOf(fontStyle) > 0 &&
      increaseOrDecrease === -1
    ) {
      setFontStyle(
        differentFontStyles[differentFontStyles.indexOf(fontStyle) - 1]
      );
    } else {
      setFontStyle(differentFontStyles[differentFontStyles.length - 1]);
    }
  };

  const changeTextPosition = (keyCode) => {
    let newTextPosition = {...textPosition}
    if(keyCode === 38){
      console.log('joao')
      newTextPosition.top--
      setTextPosition(newTextPosition)
    }else if( keyCode === 39){
      newTextPosition.right--
      setTextPosition(newTextPosition)

    }else if( keyCode === 40){
      newTextPosition.top++
      setTextPosition(newTextPosition)

    }else if( keyCode === 37){
      newTextPosition.right++
      setTextPosition(newTextPosition)

    }
  };

  return (
    <Router>
      <div className="App" style={{ fontFamily: "peacock" }}>
        <header className="header">
          <div className="logo"></div>
          <ul className="buttons">
            <li
              onClick={() => setLinkIndex(0)}
              className={linkIndex === 0 ? "focusedNavbar" : ""}
            >
              <Link
                to="/"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Home
              </Link>
            </li>

            <li
              onClick={() => setLinkIndex(1)}
              className={linkIndex === 1 ? "focusedNavbar" : ""}
            >
              <Link
                to="/contrast"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Contrast
              </Link>
            </li>
            <li
              onClick={() => setLinkIndex(2)}
              className={linkIndex === 2 ? "focusedNavbar" : ""}
            >
              <Link
                to="/about"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                About
              </Link>
            </li>
            <li
              onClick={() => setLinkIndex(3)}
              className={linkIndex === 3 ? "focusedNavbar" : ""}
            >
              <Link
                to="/contrast2"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Contrast Twitter
              </Link>
            </li>
          </ul>
        </header>

        <div className="content">
          <Switch>
            <Route path="/about">
              <h1>This is about us</h1>
            </Route>
            <Route path="/contrast">
              <Contrast
                backgroundColor={backgroundColor}
                colorText={colorText}
                bkImage={bkImage}
                returnToNavBar={returnToNavBar}
                getColor={getColor}
                imageDB={imageDB}
                changeBk={changeBk}
                fontSize={fontSize}
                fontStyle={fontStyle}
                textPosition={textPosition}
                changeFontSizeState={changeFontSizeState}
                changeFontStyleState={changeFontStyleState}
                changeTextPosition={changeTextPosition}
                picker="huepicker"
              />
            </Route>
            <Route path="/contrast2">
              <Contrast
                backgroundColor={backgroundColor}
                colorText={colorText}
                bkImage={bkImage}
                returnToNavBar={returnToNavBar}
                getColor={getColor}
                imageDB={imageDB}
                changeBk={changeBk}
                fontSize={fontSize}
                fontStyle={fontStyle}
                textPosition={textPosition}
                changeFontSizeState={changeFontSizeState}
                changeFontStyleState={changeFontStyleState}
                changeTextPosition={changeTextPosition}
                picker="twitterpicker"
              />
            </Route>
            <Route path="/">
              <FileUpload />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
