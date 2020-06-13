import React, { useState, useEffect } from "react";
import TextDisplay from "../TextDisplay/TextDisplay";
import Menu from "../Menu/Menu";
import { SafeMargin } from "../SafeMargin/SafeMargin";
import "../../App.css";
import "./Contrast.css";
import { ImageGalery } from "../ImageGalery/ImageGalery";
import { width } from "@material-ui/system";

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
  fromGalery
}) => {
  let [lateralBar, setlateralBar] = useState(showLateralBar);
  const [onGalery, setOnGalery] = useState(false);

  useEffect(() => {
    setlateralBar(showLateralBar)

    return () => {
    };
  }, [showLateralBar]);

 /*  const handleClick = () => {
    returnToNavBar(lateralBar);
    displayLateralBar();
  }; */

  const goToGalery = () => {
    setOnGalery(!onGalery);
    displayLateralBar(false, true);
  };



  return (
    <>
      <div className="wrapper">
        <div
          className={!fullscreen ? "wrapper-board" : "wrapper-board-fullscreen"}
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
              className={!fullscreen ? "text" : "text-fullscreen"}
              style={{ color: `${colorText}` }}
            >
              <TextDisplay
                fontSize={fontSize}
                textPosition={textPosition}
                fontStyle={fontStyle}
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
        

        <div className={lateralBar ? "showLateralBar menu" : "hideLateralBar "}>
          {lateralBar ? (
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
              goToGalery={goToGalery}
              fromGalery={fromGalery}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <footer className="instructions"> Instructions </footer>
    </>
  );
};

export default Contrast;
