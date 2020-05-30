import React, { useState, useEffect } from "react";
import useEventListener from "../virtual-keyboard/use-event-listener";
import "./ImageGalery.css";

export const ImageGalery = ({ imageDB, changeBk, onGalery }) => {
  const [imageIndexFocus, setImageIndexFocus] = useState(0);
  const [indexToSearch, setIndexToSearch] = useState("");
  const [indexToSearchInt, setIndexToSearchInt] = useState("");
  const [imagesToShow, setImagesToShow] = useState("");
  const [componentMount, setComponentMount] = useState(false);

  const changeIndex = (e) => {
    if (onGalery) {
      if (e.keyCode === 40) {
        if (imageIndexFocus === imageDB.length) {
          return;
        } else {
          setImageIndexFocus(imageIndexFocus + 1);
        }
      } else if (e.keyCode === 38) {
        if (imageIndexFocus === 0) {
          return;
        } else {
          setImageIndexFocus(imageIndexFocus - 1);
        }
      }
    }
  };

  const changeImageOnBoard = (e) => {
    if (onGalery) {
      if (imageIndexFocus > 0 && e.keyCode === 13) {
        changeBk(imagesToShow[imageIndexFocus - 1].url);
      }
    }
  };

  const searchForIndex = (e) => {
    if (onGalery) {
      if (imageIndexFocus === 0) {
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
        } else if (e.keyCode === 37) {
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

  useEventListener("keydown", changeIndex);
  useEventListener("keydown", changeImageOnBoard);
  useEventListener("keydown", searchForIndex);

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
          alert('Image ID Incorrect')
          setIndexToSearch("");
      }
    } else {
      setImagesToShow(imageDB);
    }
  }, [indexToSearch, imageDB, componentMount, indexToSearchInt]);

  return (
    <div className="galery-menu">
      <div className="galery-top-line">
        <div
          className="galery-search"
          style={{ border: imageIndexFocus === 0 && "1px solid black" }}
        >
          <div
            className="search-keyboard"
            style={{
              backgroundColor: imageIndexFocus === 0 && "red",
            }}
          >
            {indexToSearch ? indexToSearch : `Which Image you want to show?`}
          </div>
        </div>
      </div>
      <div className="galery-title">Galery</div>
      <div className="galery-images">
        {imagesToShow &&
          imagesToShow.map((image, index) => {
            return (
              <div
                className="galery-image"
                style={{
                  backgroundColor: index === imageIndexFocus - 1 && "red",
                }}
              >
                <div className="image-text">{image.id}</div>
                <div
                  className="image"
                  style={{ backgroundImage: `url(${image.url})` }}
                ></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};