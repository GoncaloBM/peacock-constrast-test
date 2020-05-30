import React, { useState, useEffect } from "react";
import './ImageGalery.css'

export const ImageGalery = () => {
  return (
    <div className="galery-menu">
      <div className="galery-top-line">
        <div className="galery-search">S</div>
      </div>
      <div className="galery-title">Galery</div>
      <div className="galery-images"></div>
    </div>
  );
};
