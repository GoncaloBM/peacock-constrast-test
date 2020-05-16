import { createMuiTheme } from '@material-ui/core/';
import { purple, yellow, orange, red, grey, blue, green } from '@material-ui/core/colors/';

let hue = 500;

export default createMuiTheme({
    palette: {
        yellow: {
            main: '#165788',
            backgroundColor: yellow[hue],
            color: '#000',
        },
        purple: {
            main: '#69BE28',
            backgroundColor: purple[hue],
            color: '#000',
        },
        orange: {
            backgroundColor: orange[hue],
            color: '#000',
        },
        red: {
            backgroundColor: red[hue],
            color: '#000',
        },
        grey: {
            backgroundColor: grey[hue],
            color: '#000',
        },
        blue: {
            backgroundColor: blue[hue],
            color: '#000',
        },
        green: {
            backgroundColor: green[hue],
            color: '#000',
        },

    },
});