import React, { useState, useEffect } from "react";
import "./TextDisplay.css";

const TextDisplay = (props) => {
  //font-size, font-style, position, div, h1, h2,h3,h4,5, p, i, b
  let [fontSize, setFontsize] = useState(props.fontSize);
  let [fontStyle, setFontStyle] = useState(props.fontStyle);
  let [textPosition, setTextPosition] = useState(props.textPosition);
  let [showPositionTool, setShowPositionTool] = useState(
    props.showPositionTool
  );

  useEffect(() => {
    setFontsize(props.fontSize);
    setFontStyle(props.fontStyle);
    setTextPosition(props.textPosition);
    setShowPositionTool(props.showPositionTool);
    return () => {};
  },[props,showPositionTool]);

  return (
    <div>
      {fontStyle === "div" ? (
        <div className="positioning-box">
          {props.showPositionTool ? (
            <i
              style={{
                transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(-45deg)`,
              }}
              className="arrowLeftText"
            ></i>
          ) : (
            ""
          )}

          <div
            className={`${
              props.showPositionTool ? "text-position-tool" : ""
            } textLines`}
            style={{
              fontSize: `${fontSize}rem`,
              transform: `translate(${textPosition.right}px,${textPosition.top}px)`,
            }}
          >
            {props.queryStringText}
          </div>
          {props.showPositionTool ? (
            <i
              style={{
                transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(135deg)`,
              }}
              className="arrowRightText"
            ></i>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {fontStyle === "h1" ? (
        <div className="positioning-box">
        {props.showPositionTool ? (
          <i
            style={{
              transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(-45deg)`,
            }}
            className="arrowLeftText"
          ></i>
        ) : (
          ""
        )}

        <h1
          className={`${
            props.showPositionTool ? "text-position-tool" : ""
          } textLines`}
          style={{
            fontSize: `${fontSize}rem`,
            transform: `translate(${textPosition.right}px,${textPosition.top}px)`,
          }}
        >
          {props.queryStringText} 
        </h1>
        {props.showPositionTool ? (
          <i
            style={{
              transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(135deg)`,
            }}
            className="arrowRightText"
          ></i>
        ) : (
          ""
        )}
      </div>
      ) : (
        ""
      )}
      
      {fontStyle === "p" ? (
        <div className="positioning-box">
        {props.showPositionTool ? (
          <i
            style={{
              transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(-45deg)`,
            }}
            className="arrowLeftText"
          ></i>
        ) : (
          ""
        )}

        <p
          className={`${
            props.showPositionTool ? "text-position-tool" : ""
          } textLines`}
          style={{
            fontSize: `${fontSize}rem`,
            transform: `translate(${textPosition.right}px,${textPosition.top}px)`,
          }}
        >
          {props.queryStringText} 
        </p>
        {props.showPositionTool ? (
          <i
            style={{
              transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(135deg)`,
            }}
            className="arrowRightText"
          ></i>
        ) : (
          ""
        )}
      </div>
      ) : (
        ""
      )}
      {fontStyle === "i" ? (
        <div className="positioning-box">
        {props.showPositionTool ? (
          <i
            style={{
              transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(-45deg)`,
            }}
            className="arrowLeftText"
          ></i>
        ) : (
          ""
        )}

        <i
          className={`${
            props.showPositionTool ? "text-position-tool" : ""
          } textLines`}
          style={{
            fontSize: `${fontSize}rem`,
            transform: `translate(${textPosition.right}px,${textPosition.top}px)`,
          }}
        >
          {props.queryStringText} 
        </i>
        {props.showPositionTool ? (
          <i
            style={{
              transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(135deg)`,
            }}
            className="arrowRightText"
          ></i>
        ) : (
          ""
        )}
      </div>
      ) : (
        ""
      )}
      {fontStyle === "b" ? (
       <div className="positioning-box">
       {props.showPositionTool ? (
         <i
           style={{
             transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(-45deg)`,
           }}
           className="arrowLeftText"
         ></i>
       ) : (
         ""
       )}

       <b
         className={`${
           props.showPositionTool ? "text-position-tool" : ""
         } textLines`}
         style={{
           fontSize: `${fontSize}rem`,
           transform: `translate(${textPosition.right}px,${textPosition.top}px)`,
         }}
       >
         {props.queryStringText}
       </b>
       {props.showPositionTool ? (
         <i
           style={{
             transform: `translate(${textPosition.right}px,${textPosition.top}px) rotate(135deg)`,
           }}
           className="arrowRightText"
         ></i>
       ) : (
         ""
       )}
     </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextDisplay;
