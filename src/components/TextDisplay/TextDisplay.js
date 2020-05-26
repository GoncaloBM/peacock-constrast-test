import React, {useState, useEffect} from 'react';
import "./TextDisplay.css"

const TextDisplay = (props) => {

    //font-size, font-style, position, div, h1, h2,h3,h4,5, p, i, b
    let [fontSize, setFontsize] = useState(props.fontSize)
    let[fontStyle, setFontStyle] = useState(props.fontStyle)
    let [textPosition, setTextPosition] = useState(props.textPosition)

    useEffect(() => {
        setFontsize(props.fontSize)
        setFontStyle(props.fontStyle)
        setTextPosition(props.textPosition)

        return () => {
        }
    }, [ props])

    return(
        <div >
         {fontStyle === 'div' ? <div className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</div> : ''}
         {fontStyle === 'h1' ? <h1 className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</h1> : ''}
         {fontStyle === 'h2' ? <h2 className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</h2> : ''}
         {fontStyle === 'h3' ? <h3 className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</h3> : ''}
         {fontStyle === 'h4' ? <h4 className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</h4> : ''}
         {fontStyle === 'h5' ? <h5 className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</h5> : ''}
         {fontStyle === 'p' ? <p className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</p> : ''}
         {fontStyle === 'i' ? <i className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</i> : ''}
         {fontStyle === 'b' ? <b className='textLines' style={{ fontSize: `${fontSize}px`, top:`${textPosition.top}px`, right: `${textPosition.right}px`}}>This is Board in {fontStyle}</b> : ''}


        </div>
    )
}

export default TextDisplay