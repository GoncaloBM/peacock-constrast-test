import { createMuiTheme } from '@material-ui/core/';
import { purple, yellow, orange, red, grey, blue, green } from '@material-ui/core/colors/';

let hue = 100;



export  const customMuiTheme= (x) => {
    let bananas = {
        palette: {
            yellow: {
                main: '#165788',
                backgroundColor: yellow[x],
                color: '#000',
            },
            purple: {
                main: '#69BE28',
                backgroundColor: purple[x],
                color: '#000',
            },
            orange: {
                backgroundColor: orange[x],
                color: '#000',
            },
            red: {
                backgroundColor: red[x],
                color: '#000',
            },
            grey: {
                backgroundColor: grey[x],
                color: '#000',
            },
            blue: {
                backgroundColor: blue[x],
                color: '#000',
            },
            green: {
                backgroundColor: green[x],
                color: '#000',
            },
    
        },
    
    }
    

    return createMuiTheme(bananas)

}
