import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
  root: {
    width: 200,
  },
});


export default function ContinuousSlider({hue,getHue}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(hue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getHue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Shadow
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider max={1000} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
      </Grid>
    </div>
  );
}