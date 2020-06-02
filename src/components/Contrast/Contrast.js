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
}) => {
  const [lateralBar, setlateralBar] = useState(false);
  const [onGalery, setOnGalery] = useState(false);

  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, [lateralBar]);

  const handleClick = () => {
    returnToNavBar(lateralBar);
    setlateralBar(!lateralBar);
  };

  const goToGalery = () => {
    setOnGalery(!onGalery);
    setlateralBar(!lateralBar);
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
        <div onClick={handleClick}>SHOW MENU</div>

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
