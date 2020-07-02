import React, { useState, useEffect } from "react";
import TextDisplay from "../TextDisplay/TextDisplay";
import Menu from "../Menu/Menu";
import { SafeMargin } from "../SafeMargin/SafeMargin";
import "../../App.css";
import "./Contrast.css";
import { ImageGalery } from "../ImageGalery/ImageGalery";
import Information from "../information/information";
import { VirtualKeyboard } from "../virtual-keyboard/VirtualKeyboard";
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
  safeMargin,
  fullscreen,
  showLateralBar,
  displayLateralBar,
  fromGalery,
  linkIndex,
  fromUploadToGallery,
  fromInformation,
  queryStringText
}) => {
  let [lateralBar, setlateralBar] = useState(showLateralBar);
  const [onGalery, setOnGalery] = useState(false);
  const [showTextPositionTool, setShowTextPositionTool] = useState(false);
  const [onInformation, setOnInformation] = useState(false);
  let [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [keyboardText, setkeyboardText] = useState(false);

  const exitKeyboard = () => {
    setShowVirtualKeyboard(false);
  };

  useEffect(() => {
    setlateralBar(showLateralBar);

    if (fromUploadToGallery === true) {
      console.log('bananas')
      setOnGalery(true);
      displayLateralBar(false, "fromUpload");
    }
   

    return () => {};
  }, [
    showLateralBar,
    showTextPositionTool,
    fromUploadToGallery,
    fromInformation,
    onGalery,
    displayLateralBar
  ]);

  /*  const handleClick = () => {
    returnToNavBar(lateralBar);
    displayLateralBar();
  }; */

  const goToGalery = () => {
    console.log("onGallery state: ", onGalery);
    setOnGalery(!onGalery);
    console.log("onGallery state: ", onGalery);

    displayLateralBar(false, true);
  };

  const goToInformation = () => {
    setOnInformation(!onInformation);
    displayLateralBar(false, "information");
  };
  const getTextPositionTool = () => {
    setShowTextPositionTool(!showTextPositionTool);
  };

  return (
    <>
      <div className="wrapper">
        {showVirtualKeyboard && (
          <VirtualKeyboard
            previewColor={backgroundColor}
            isText={keyboardText}
            getColor={(color, isText) => getColor(color, isText)}
            exitKeyboard={exitKeyboard}
            changeBk={changeBk}
          />
        )}

        <div
          className={
            !fullscreen ? "wrapper-board" : "wrapper-board-fullscreen "
          }
        >
          <div
            style={{
              backgroundColor: `${backgroundColor}`,
              color: `${colorText}`,
              backgroundImage: `url(${bkImage})`,
            }}
            className="Board"
          >
            <div
              className={`    ${!fullscreen ? "text" : "text-fullscreen"}`}
              style={{ color: `${colorText}` }}
            >
              <TextDisplay
                showPositionTool={showTextPositionTool}
                fontSize={fontSize}
                textPosition={textPosition}
                fontStyle={fontStyle}
                queryStringText={queryStringText}
              />
            </div>
            {safeMargin && <SafeMargin />}
          </div>
        </div>
        {onGalery && (
          <ImageGalery
            imageDB={imageDB}
            changeBk={changeBk}
            onGalery={onGalery}
            goToGalery={goToGalery}
          />
        )}
        {onInformation && (
          <Information
            backgroundColor={backgroundColor}
            colorText={colorText}
            fontSize={fontSize}
            fontStyle={fontStyle}
            onInformation={onInformation}
            goToInformation={goToInformation}
          />
        )}

        <div className={lateralBar ? "showLateralBar menu" : "hideLateralBar "}>
          {lateralBar ? (
            <Menu
              linkIndex={linkIndex}
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
              goToGalery={goToGalery}
              fromGalery={fromGalery}
              fromInformation={fromInformation}
              getTextPositionTool={getTextPositionTool}
              showTextPositionTool={showTextPositionTool}
              goToInformation={goToInformation}
              onInformation={onInformation}
              setShowVirtualKeyboard={setShowVirtualKeyboard}
              showVirtualKeyboard={showVirtualKeyboard}
              setkeyboardText={setkeyboardText}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {/*       <footer className="instructions"> Instructions </footer>
       */}{" "}
    </>
  );
};

export default Contrast;
