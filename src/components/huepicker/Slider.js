import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
/* import Slider from "@material-ui/core/Slider";
 */
const useStyles = makeStyles({
  root: {
    width: 1000,
  },
});


const hueValues = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  "A100",
  "A200",
  "A400",
  "A700",
];

export default function ContinuousSlider({ hue, getHue, focusItem,isText }) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(hue);
  let [array, setArray] = useState(5);
  let [defaultValue, setdefaultValue] = useState(hueValues[array]);
  // const handleChange = useCallback(
  //   (newValue) => {
  //     console.log(isText)
  //     getHue(newValue, isText);
  //   },
  //   [getHue,isText]
  // );

  const handleChange=(newValue,isText)=>{
    console.log("newValue: ", newValue);
    console.log("isText: ", isText);
    
    getHue(newValue, isText);
  }

  useEffect(() => {
    let keydown = (event) => {
      if (
        event.key === "ArrowRight" &&
        (focusItem === 2 ) &&
        !isText &&
       array < (hueValues.length - 1)
      ) {
        setArray(array + 1);
        setdefaultValue(hueValues[array +1]);
        let newArray = array +1;
        handleChange(hueValues[newArray],isText);
        // this.props.getColor(color, this.props.isText);

      }
      if (
        event.key === "ArrowLeft" &&
        (focusItem === 2 && !isText) &&
        array >0 
      ) {
        setArray(array - 1);
        setdefaultValue(hueValues[array-1]);
        let newArray = array-1;
        handleChange(hueValues[newArray],isText);   
             // this.props.getColor(color, this.props.isText);
      }
      if (
        event.key === "ArrowRight" &&
        (focusItem === 5 ) &&
        isText &&
       array < (hueValues.length - 1)
      ) {
        setArray(array + 1);
        setdefaultValue(hueValues[array +1]);
        let newArray = array +1;
        handleChange(hueValues[newArray],isText);
        // this.props.getColor(color, this.props.isText);

      }
      if (
        event.key === "ArrowLeft" &&
        (focusItem === 5 && isText) &&
        array >0 
      ) {
        setArray(array - 1);
        setdefaultValue(hueValues[array-1]);
        let newArray = array-1;
        handleChange(hueValues[newArray],isText);   
             // this.props.getColor(color, this.props.isText);
      }
  
    };
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, [defaultValue, focusItem, handleChange, array,isText]);

  return (
    <div className={classes.root} onChange={handleChange}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Shadow
      </Typography>
      {/* <Slider
        min={50}
        max={900}
        defaultValue={defaultValue}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        marks={marks}
        onChange={handleChange}
      /> */}
    </div>
  );
}
