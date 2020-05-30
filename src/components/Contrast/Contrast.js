import React, {useState, useEffect} from "react";
import TextDisplay from "../TextDisplay/TextDisplay";
import Menu from "../Menu/Menu";
import { SafeMargin } from "../SafeMargin/SafeMargin";
import "../../App.css";
import "./Contrast.css"
import { ImageGalery } from '../ImageGalery/ImageGalery';


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
  }) => {

    const [lateralBar, setlateralBar] = useState(false)
    
    useEffect(() => {
      console.log('mount')
      return () => {
        console.log('unmount')
      }
    }, [lateralBar])

    const handleClick = () => {
      returnToNavBar(lateralBar)
      setlateralBar(!lateralBar)
    }


    return (
      <>
        <div className="wrapper">
          <div className="wrapper-board">
            <div
              style={{
                backgroundColor: `${backgroundColor}`,
                color: `${colorText}`,
                backgroundImage: `url(${bkImage})`,
              }}
              className="Board"
            >
              <TextDisplay
                fontSize={fontSize}
                textPosition={textPosition}
                fontStyle={fontStyle}
              />
              {safeMargin && <SafeMargin />}
            </div>
          </div>
          <ImageGalery imageDB={imageDB} />
          <div onClick={handleClick}>SHOW MENU</div>
  
          <div  className={lateralBar ? 'showLateralBar menu' : 'hideLateralBar '}>
            {lateralBar ?  <Menu
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
            /> : ''}
           
          </div>
        </div>
      <footer className="instructions"> Instructions </footer>
    </>
  );
};

export default Contrast;
