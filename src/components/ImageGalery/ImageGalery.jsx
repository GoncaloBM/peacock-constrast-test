import React, { useState, useEffect } from "react";
import useEventListener from "../virtual-keyboard/use-event-listener";
import "./ImageGalery.css";

export const ImageGalery = ({ imageDB, changeBk, onGalery, goToGalery }) => {
  const [imageIndexFocus, setImageIndexFocus] = useState(0);
  const [searchMenuIndex, setSearchMenuIndex] = useState(0);
  const [indexToSearch, setIndexToSearch] = useState("");
  const [indexToSearchInt, setIndexToSearchInt] = useState("");
  const [scrollList, setScrollList] = useState(0);
  const [imagesToShow, setImagesToShow] = useState("");
  const [componentMount, setComponentMount] = useState(false);

  const upArrow = 38;
  const downArrow = 40;
  const enter = 13;
  const leftArrow = 37;
  const rightArrow = 39;

  const changeIndex = (e) => {
    if (onGalery) {
      if (e.keyCode === downArrow) {
        if (imageIndexFocus === imageDB.length) {
          return;
        } else {
          if (imageIndexFocus > 5) {
            setScrollList(scrollList - 10.5);
          }
          setImageIndexFocus(imageIndexFocus + 1);
        }
      } else if (e.keyCode === upArrow) {
        if (imageIndexFocus === 0) {
          return;
        } else {
          if (imageIndexFocus > 6) {
            setScrollList(scrollList + 10.5);
          }
          setImageIndexFocus(imageIndexFocus - 1);
        }
      }
    }
  };

  const changeImageOnBoard = (e) => {
    if (onGalery) {
      if (imageIndexFocus > 0 && e.keyCode === enter) {
        changeBk(imagesToShow[imageIndexFocus - 1].url);
      }
    }
  };

  const backToMenu = (e) => {
    if (onGalery) {
      if (
        imageIndexFocus === 0 &&
        searchMenuIndex === 1 &&
        e.keyCode === enter
      ) {
        goToGalery();
      }
    }
  };

  const searchOrBack = (e) => {
    if (onGalery) {
      if (imageIndexFocus === 0 && e.keyCode === leftArrow) {
        setSearchMenuIndex(0);
      } else if (imageIndexFocus === 0 && e.keyCode === rightArrow) {
        setSearchMenuIndex(1);
      }
    }
  };

  const searchForIndex = (e) => {
    if (onGalery) {
      if (imageIndexFocus === 0 && searchMenuIndex === 0) {
        if (
          e.keyCode === 48 ||
          e.keyCode === 49 ||
          e.keyCode === 50 ||
          e.keyCode === 51 ||
          e.keyCode === 52 ||
          e.keyCode === 53 ||
          e.keyCode === 54 ||
          e.keyCode === 55 ||
          e.keyCode === 56 ||
          e.keyCode === 57
        ) {
          setIndexToSearch(indexToSearch + e.key);
        } else if (e.keyCode === leftArrow) {
          if (indexToSearch.length === 1) {
            setIndexToSearch("");
            setImagesToShow(imageDB);
          } else {
            setIndexToSearch(indexToSearch.slice(0, -1));
          }
        }
      }
    }
  };

  useEventListener("keydown", backToMenu);
  useEventListener("keydown", changeIndex);
  useEventListener("keydown", changeImageOnBoard);
  useEventListener("keydown", searchForIndex);
  useEventListener("keydown", searchOrBack);

  useEffect(() => {
    if (imageDB && !componentMount) {
      setImagesToShow(imageDB);
      setComponentMount(true);
    }
    setIndexToSearchInt(parseInt(indexToSearch));

    if (indexToSearchInt) {
      if (imageDB[indexToSearchInt - 1]) {
        setImagesToShow([imageDB[indexToSearchInt - 1]]);
      } else {
        alert("Image ID Incorrect");
        setIndexToSearch("");
      }
    } else {
      setImagesToShow(imageDB);
    }
  }, [indexToSearch, imageDB, componentMount, indexToSearchInt]);

  return (
    <div className="galery-menu">
      <div className="galery-top-line">
        <div className="galery-search">
          <div
            className="search-keyboard"
            style={{
              backgroundColor:
                imageIndexFocus === 0 && searchMenuIndex === 0 && "#ef1541",
            }}
          >
            <div
              className="glass-icon"
              //   style={{ width: `${imageIndexFocus === 0 ? 80 : ""}%` }}
            ></div>
            {indexToSearch
              ? indexToSearch
              : imageIndexFocus === 0 && searchMenuIndex === 0
              ? `Which Image you want to show?`
              : ""}
          </div>
          <div
            className="galery-back"
            style={{
              backgroundColor:
                imageIndexFocus === 0 && searchMenuIndex === 1 && "#ef1541",
            }}
          >
            Back
          </div>
        </div>
      </div>
      <div className="galery-title">Image Gallery</div>
      <div className="galery-images-wrapper">
        <div
          className="image-selector"
          style={{
            top: `${
              imageIndexFocus < 7 ? 10.5 * imageIndexFocus - 10.5 : ""
            }vh`,
          }}
        ></div>
        <div
          className="galery-images-scroll"
          style={{ top: `${scrollList}vh` }}
        >
          {imagesToShow &&
            imagesToShow.map((image, index) => {
              return (
                <div
                  className="galery-image"
                  //   style={{
                  //     backgroundColor: index === imageIndexFocus - 1 && "red",
                  //   }}
                >
                  <div className="image-text">{image.id}</div>
                  <div
                    className="image shadow"
                    style={{ backgroundImage: `url(${image.url})` }}
                  ></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
