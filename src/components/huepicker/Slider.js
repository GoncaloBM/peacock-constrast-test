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

/* const marks = [
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 200,
    label: "200",
  },
  {
    value: 300,
    label: "300",
  },
  {
    value: 400,
    label: "400",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 600,
    label: "600",
  },
  {
    value: 700,
    label: "700",
  },
  {
    value: 800,
    label: "800",
  },
  {
    value: 900,
    label: "900",
  },
]; */

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

export default function ContinuousSlider({ hue, getHue, focusItem }) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(hue);
  let [array, setArray] = useState(5);
  let [defaultValue, setdefaultValue] = useState(hueValues[array]);
  const handleChange = useCallback(
    (newValue) => {
      getHue(newValue);
    },
    [getHue]
  );

  useEffect(() => {
    let keydown = (event) => {
      if (
        event.key === "ArrowRight" &&
        (focusItem === 2 || focusItem === 5) &&

       array < (hueValues.length - 1)
      ) {
        setArray(array + 1);
        setdefaultValue(hueValues[array +1]);
        let newArray = array +1;
        handleChange(hueValues[newArray]);
      }
      if (
        event.key === "ArrowLeft" &&
        (focusItem === 2 || focusItem === 5) &&

        array >0 
      ) {
        setArray(array - 1);
        setdefaultValue(hueValues[array-1]);
        let newArray = array-1;
        handleChange(hueValues[newArray]);
      }
  
    };
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, [defaultValue, focusItem, handleChange, array]);

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
