import React, { useState, useEffect } from "react";
import useEventListener from "../virtual-keyboard/use-event-listener";
import "./ImageGalery.css";

export const ImageGalery = ({ imageDB, changeBk }) => {
  const [imageIndexFocus, setImageIndexFocus] = useState(0);

  const changeIndex = (e) => {
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
  };

  const changeImageOnBoard = (e) => {
    if (imageIndexFocus > 0 && e.keyCode === 13) {
      changeBk(imageDB[imageIndexFocus-1].url);
    }
  };

  useEventListener("keydown", changeIndex);
  useEventListener("keydown", changeImageOnBoard);

  return (
    <div className="galery-menu">
      <div className="galery-top-line">
        <div
          className="galery-search"
          style={{ border: imageIndexFocus === 0 && "1px solid black" }}
        >
          Search
        </div>
      </div>
      <div className="galery-title">Galery</div>
      <div className="galery-images">
        {imageDB &&
          imageDB.map((image, index) => {
            return (
              <div
                className="galery-image"
                style={{
                  backgroundColor: imageIndexFocus === index + 1 && "red",
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
