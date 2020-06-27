import React, { useEffect, useRef } from "react";

import { useHistory } from "react-router-dom";

const Controller = ({backToGallery}) => {
  let history = useHistory();
  const secretKey = useRef([]);

  function goBack() {
    secretKey.current = [];
    history.push("/");
    backToGallery()
  }

  function goUpload() {
    secretKey.current = [];
    history.push("/upload");
  }

  const goToUpload = (e) => {

  if (secretKey.current.length > 7){
    secretKey.current.shift()
    secretKey.current.push(e.keyCode)
  }else{
    secretKey.current.push(e.keyCode)
  }

    ///console.log(e.keyCode);
   // console.log("Secret Key+ ", secretKey.current);
    if (
      JSON.stringify(secretKey.current) ===
      JSON.stringify([37, 38, 39, 40, 37, 38, 39, 40])
    ) {
      //console.log("Secret Key accepted");
      //console.log(history.location);

      history.location.pathname === "/upload" ? goBack() : goUpload();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", goToUpload);

    return () => {
      window.removeEventListener("keydown", goToUpload);
    };
  });

  return <div></div>;
};

export default Controller;
