import React, { useEffect, useState } from "react";
import "./App.css";
import "./fonts/fonts.css";
import FileUpload from "./components/fileUploader/fileUpload";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Modal from "./components/modal/modal";
import Controller from "./components/Controller";
import { useCallback } from "react";

import Contrast from "./components/Contrast/Contrast";

function App(props) {
  let differentFontStyles = ["div", "p", "h1", "i", "b"];
  let startetTextPosition = { top: 0, right: 0 };
  let [backgroundColor, setBackgroundColor] = useState("#000000");
  let [colorText, setColorText] = useState("#F2F2F2");
  const [modalIsOpen, setIsOpen] = useState(true);
  const [fontSize, setfontSize] = useState(4);
  const [fontStyle, setFontStyle] = useState(differentFontStyles[0]);
  const [textPosition, setTextPosition] = useState(startetTextPosition);
  const [fullscreen, setFullscreen] = useState(false);
  let [showLateralBar, setShowLateralBar] = useState(false);
  let [fromGalery, setFromGalery] = useState(false);
  let [fromUploadToGallery, setFromUploadToGallery] = useState(false);
  let [linkIndex, setLinkIndex] = useState(2);
  let [navBarNavigating, setNavBarNavigating] = useState(true);
  const [safeMargin, setSafeMargin] = useState(false);
  const [bkImage, setBkImage] = useState(`${process.env.REACT_APP_API_URL}images/1.png`);
  const [imageDB, setImageDB] = useState("");
  const [fromInformation, setFromInformation] = useState(false);
  const [queryStringText, setQueryStringText] = useState(localStorage.getItem('text')? localStorage.getItem('text') : 'Wubba Lubba dub-dub' );

  const openModal = useCallback(
    (e) => {
      if (e.keyCode === 13 && linkIndex === 2) {
        setIsOpen(!modalIsOpen);
      }
    },
    [modalIsOpen, linkIndex]
  );
  useEffect(() => {
    fetchImages();
    fetchQuerytStringText();

    const showSafeMargin = (e) => {
      if (e.keyCode === 101 || e.keyCode === 53) {
        setSafeMargin(!safeMargin);
        setFullscreen(!fullscreen);
      }
    };

    const navBarNavigation = (e) => {
      if (navBarNavigating) {
        if (
          e.keyCode === 39 &&
          linkIndex === 1 &&
          modalIsOpen === false &&
          showLateralBar === false
        ) {
          setLinkIndex(2);
        }
        if (
          e.keyCode === 37 &&
          linkIndex === 2 &&
          modalIsOpen === false &&
          showLateralBar === false
        ) {
          setLinkIndex(1);
        }

        if (e.keyCode === 13 && linkIndex === 1) {
          setShowLateralBar(!showLateralBar);
          setFromGalery(false);
          setFromInformation(false);
        }
      }
    };
    window.addEventListener("keydown", navBarNavigation);
    window.addEventListener("keydown", showSafeMargin);
    window.addEventListener("keydown", openModal);

    return () => {
      window.removeEventListener("keydown", navBarNavigation);
      window.removeEventListener("keydown", showSafeMargin);
      window.removeEventListener("keydown", openModal);
    };
  }, [
    colorText,
    backgroundColor,
    bkImage,
    linkIndex,
    navBarNavigating,
    fontSize,
    fontStyle,
    safeMargin,
    fullscreen,
    showLateralBar,
    modalIsOpen,
    openModal,
    queryStringText,
    fromUploadToGallery
  ]);

  let getColor = (color, isText) => {
    if (isText) {
      setColorText(color);
    } else {
      setBackgroundColor(color);
    }
  };

  const fetchImages = () => {
    const dbUrl = `${process.env.REACT_APP_API_URL}getpictures`;
    axios.get(dbUrl).then((res) => {
      setImageDB(res.data.reverse());
    });
  };
 const fetchQuerytStringText = () =>{
   if(window.location.search){
    axios.get(`${process.env.REACT_APP_API_URL}${window.location.search}`).then(res=>{
      localStorage.setItem('text', (res.data))
      setQueryStringText(localStorage.getItem('text'))
    })
   }

 }


  const changeBk = (bkUrl) => {
    bkUrl = process.env.REACT_APP_API_URL + bkUrl;
    setBkImage(bkUrl);
    // console.log(bkUrl);
  };

  const returnToNavBar = (returningToNavBar) => {
    if (returningToNavBar) {
      setLinkIndex(1);
      setNavBarNavigating(true);
    } else {
      // console.log("a descer");
      setNavBarNavigating(false);
      setLinkIndex(-1);
    }
  };

  const changeFontSizeState = (increaseOrDecrease) => {
    setfontSize(fontSize + increaseOrDecrease);

    //console.log(fontSizeforText);
    //console.log(fontSize);
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
    let newTextPosition = { ...textPosition };
    if (keyCode === 38) {
      newTextPosition.top--;
      setTextPosition(newTextPosition);
    } else if (keyCode === 39) {
      newTextPosition.right++;
      setTextPosition(newTextPosition);
    } else if (keyCode === 40) {
      newTextPosition.top++;
      setTextPosition(newTextPosition);
    } else if (keyCode === 37) {
      newTextPosition.right--;
      setTextPosition(newTextPosition);
    }
  };

  const displayLateralBar = (e, fromGalery) => {
    if (fromGalery === "fromUpload") {
      setFromGalery(true);

      setShowLateralBar(false);
      setFromUploadToGallery(false);
      console.log("Reberti");
    } else {
      console.log("from Galery: ", fromGalery);
      if (fromGalery === true) {
        setFromGalery(true);
        console.log("Joao");
      } else {
        setFromGalery(false);
        console.log("Eduardo");
      }
      if (fromGalery === "information") {
        setFromInformation(true);
      } else {
        setFromInformation(false);
      }
      setShowLateralBar(!showLateralBar);
      setFromUploadToGallery(false);
      console.log("Reberti");
    }
  };

  const backToGallery = () => {
    console.log("reberit");
    setShowLateralBar(false);

    setFromGalery(true);
    setIsOpen(false);
    setFromUploadToGallery(true);
    setLinkIndex(-1);
  };

  return (
    <Router>
      <div className="App" style={{ fontFamily: "peacock" }}>
        <div className="content">
          <Switch>
            <Route path="/upload">
              <Controller backToGallery={backToGallery}></Controller>

              <FileUpload />
            </Route>
            <Route path="/">
              <Controller></Controller>
              <div className="headerino">
                <div className="logospace">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="sk-logo"
                    viewBox="0 0 878 272"
                    aria-hidden="true"
                  >
                    <path
                      d="M868.418 251.951c-7.95 4.076-17.698.936-21.774-7.014-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.014 4.076 7.95.935 17.699-7.014 21.774z"
                      fill="#05AC3F"
                    ></path>
                    <path
                      d="M868.418 208.505c-7.95 4.076-17.698.935-21.774-7.014-4.076-7.95-.936-17.699 7.013-21.775 7.95-4.075 17.7-.935 21.775 7.014 4.076 7.95.935 17.699-7.014 21.775z"
                      fill="#069DE0"
                    ></path>
                    <path
                      d="M868.417 164.467c-7.95 4.076-17.697.935-21.773-7.015-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.014 4.076 7.95.935 17.699-7.015 21.775z"
                      fill="#6E55DC"
                    ></path>
                    <path
                      d="M868.418 119.206c-7.95 4.076-17.698.935-21.774-7.015-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.935 21.775 7.014 4.076 7.95.935 17.699-7.014 21.775z"
                      fill="#EF1541"
                    ></path>
                    <path
                      d="M868.418 75.398c-7.95 4.076-17.698.935-21.774-7.014-4.076-7.95-.936-17.699 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.013 4.076 7.95.935 17.7-7.014 21.775z"
                      fill="#FF7112"
                    ></path>
                    <path
                      d="M868.418 31.298c-7.95 4.075-17.698.935-21.774-7.015-4.076-7.95-.936-17.698 7.013-21.774 7.95-4.076 17.7-.936 21.775 7.014 4.076 7.95.935 17.699-7.014 21.775z"
                      fill="#FCCC12"
                    ></path>
                    <path
                      className="sk-logo__text sk-logo__text--white"
                      d="M56.952 84.278c-31.047 0-56.306 25.26-56.306 56.307V270.83h26.7v-72.358l9.747 10.365 39.212-15.361c22.426-8.744 36.953-28.807 36.953-52.892 0-31.047-25.259-56.307-56.306-56.307v.001zm10.02 85.509l-39.626 15.531v-44.734c0-17.909 13.445-30.92 29.606-30.92 16.16 0 29.607 13.011 29.607 30.92 0 11.319-5.525 23.692-19.587 29.202v.001zm111.358-85.51c-31.046 0-56.306 25.259-56.306 56.306 0 31.047 25.26 56.306 56.307 56.306 18.47 0 35.961-8.94 45.924-22.72l-21.42-14.829c-2.579 4.231-10.781 12.164-24.504 12.164-12.786 0-23.017-7.634-27.355-18.725h81.234a58.702 58.702 0 001.273-12.196c0-31.047-24.106-56.306-55.152-56.306h-.001zm-27.31 44.11c4.41-11.091 14.755-18.726 27.31-18.726 12.787 0 22.37 7.635 26.383 18.725H151.02v.001zm177.947-30.664c-9.055-9.41-21.022-13.446-33.652-13.446-26.123 0-52.722 23.72-52.722 56.306s26.6 56.306 52.722 56.306c12.63 0 24.597-4.036 33.652-13.446v10.159h26.7V87.565h-26.7v10.16-.002zm-29.607 73.781c-17.083 0-30.067-13.629-30.067-30.921s13.292-30.921 30.067-30.921c17.084 0 29.607 13.629 29.607 30.92 0 17.293-12.523 30.922-29.607 30.922zm122.8-61.82c11.589 0 21.075 6.277 25.974 15.714l20.846-15.989c-10.098-15.117-27.316-25.093-46.82-25.093-31.026 0-56.27 25.243-56.27 56.27 0 31.026 25.244 56.269 56.27 56.269 19.504 0 36.722-9.976 46.82-25.093l-20.846-15.989c-4.899 9.437-14.385 15.714-25.974 15.714-17.072 0-29.587-13.62-29.587-30.901 0-17.282 12.822-30.902 29.587-30.902zm106.081-25.438c-31.047 0-56.304 25.258-56.304 56.304 0 31.047 25.257 56.306 56.304 56.306s56.306-25.26 56.306-56.306c0-31.046-25.26-56.304-56.306-56.304zm.018 87.19c-17.086 0-29.61-13.63-29.61-30.924 0-17.294 12.832-30.925 29.61-30.925 17.086 0 29.61 13.631 29.61 30.925 0 17.295-12.524 30.925-29.61 30.925v-.001zm121.748-61.752c11.588 0 21.075 6.277 25.974 15.714l20.846-15.989c-10.099-15.117-27.316-25.093-46.82-25.093-31.027 0-56.27 25.243-56.27 56.27 0 31.026 25.243 56.269 56.27 56.269 19.504 0 36.721-9.976 46.82-25.093l-20.846-15.989c-4.9 9.437-14.386 15.714-25.974 15.714-17.073 0-29.587-13.62-29.587-30.901 0-17.282 12.822-30.902 29.587-30.902zm121.442 27.035h-12.011l46.45-49.156h-34.507l-37.434 40.259V29.805h-26.7v163.797h26.7V163.48l14.804-15.539 31.486 45.662h32.327l-41.115-56.883v-.001z"
                    ></path>
                  </svg>
                </div>
                <div className="iconsMenu">
                  <div
                    className={`hamburger ${
                      linkIndex === 1 ? "focusedMenu" : ""
                    }`}
                    onClick={displayLateralBar}
                  >
                    {/* <div className="patty"></div>
                    <div className="patty"></div>
                    <div className="patty"></div> */}
                    <div
                      className="focus-hamburger"
                      style={{ opacity: linkIndex === 1 ? "1" : "0" }}
                    ></div>
                  </div>

                  <div
                    className={`help ${linkIndex === 2 ? "focusedMenu" : ""}`}
                    onKeyDown={openModal}
                  ></div>
                </div>
              </div>
              <Modal modalIsOpen={modalIsOpen}></Modal>
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
                safeMargin={safeMargin}
                fullscreen={fullscreen}
                showLateralBar={showLateralBar}
                displayLateralBar={displayLateralBar}
                fromGalery={fromGalery}
                fromInformation={fromInformation}
                linkIndex={linkIndex}
                fromUploadToGallery={fromUploadToGallery}
                queryStringText = {queryStringText}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
