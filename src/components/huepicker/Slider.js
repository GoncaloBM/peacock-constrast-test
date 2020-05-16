// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import Slider from "@material-ui/core/Slider";

// const useStyles = makeStyles({
//   root: {
//     width: 200,
//   },
// });

// function valueLabelFormat(value) {
//   return marks.findIndex((mark) => mark.value === value) + 1;
// }
// function valuetext(value) {
//   return `${value}°C`;
// }
// export default function ContinuousSlider({ hue, getHue }) {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(hue);

//   return (
//     <div className={classes.root}>
//       <Typography id="continuous-slider" gutterBottom>
//         Shadow
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs>
//           <Slider
//            defaultValue={50}
//            valueLabelFormat={valueLabelFormat}
//            getAriaValueText={valuetext}
//            aria-labelledby="discrete-slider-restrict"
//            step={null}
//            valueLabelDisplay="auto"
//            marks={marks}
//             //       valueLabelFormat={valueLabelFormat}

//             //       step={null}
//             // marks={marks}
//             // max={1000}
//             // value={value}
//             // onChange={handleChange}
//             // aria-labelledby="continuous-slider"
//           />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 1000,
  },
});

const marks = [
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
];

export default function ContinuousSlider({ hue, getHue }) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(hue);

  const handleChange = (event, newValue) => {
    getHue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Shadow
      </Typography>
      <Slider
        min={50}
        max={900}
        defaultValue={500}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        marks={marks}
        onChange={handleChange}
      />
    </div>
  );
}
