import React, { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link  } from "react-router-dom";


function App(props) {
  let [backgroundColor, setBackgroundColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  let [colorText, setColorText] = useState({
    r: 242,
    g: 242,
    b: 242,
    a: 1,
  });

  const getWindowLocation = () =>{
    if(window.location.pathname==='/'){
      return 0
    }else if(window.location.pathname==='/contrast'){
      return 1
    }else if(window.location.pathname === '/about'){
      return 2
    }
  }


  let [linkIndex, setLinkIndex] = useState(getWindowLocation());
  let [navBarNavigating, setNavBarNavigating] = useState(true);
  let [contrast, setContrast] = useState(false)

  const [bkImage, setBkImage] = useState("");
  const [imageDB, setImageDB] = useState("");

  
  
   
  
  
   
  useEffect(() => {

    fetchImages();
    const navBarNavigation = (e) => {
      if (navBarNavigating) {
        let newIndex = linkIndex;

        if (e.keyCode === 13 && linkIndex === 1) {
          if(window.location.pathname !== "/contrast"){
            window.location.pathname = '/contrast'
            
            

          }
        } 
        if (e.keyCode === 13 && linkIndex === 2) {
          if(window.location.pathname !== "/about"){
            window.location.pathname = '/about'
            
            

          }
        } 
        if (e.keyCode === 13 && linkIndex === 0) {
          if(window.location.pathname !== "/"){
            window.location.pathname = '/'
            
            

          }
        } 


        if (e.keyCode === 37 && linkIndex > 0) {
          newIndex--;
          setLinkIndex(newIndex);
        } 
        
        if (e.keyCode === 39 && linkIndex < 2) {
  
          newIndex++;
          setLinkIndex(newIndex);
        }
       
      }
    };
    window.addEventListener("keydown", navBarNavigation);
    return () => {
      window.removeEventListener("keydown", navBarNavigation);
    };
  }, [colorText, backgroundColor, bkImage, linkIndex, navBarNavigating]);

 

  let getColor = (color, isText) => {
    if (isText) {
      setColorText(color);
    } else {
      setBackgroundColor(color);
    }
  };

  const fetchImages = () => {
    const dbUrl = "/images/images.json";
    axios.get(dbUrl).then((res) => {
      setImageDB(res.data);
    });
  };

  const changeBk = (bkUrl) => {
    setBkImage(bkUrl);
  };

  const returnToNavBar = (returningToNavBar) => {
    if(returningToNavBar){
      setLinkIndex(2);
      setNavBarNavigating(true);
    }
    else{
      console.log('a descer')
      setNavBarNavigating(false);
      setLinkIndex(-1);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <ul>
            <li onClick={() => setLinkIndex(0)} className={linkIndex === 0 ? "focusedNavbar" : ""}>
              <Link to="/">Home</Link>
            </li>

            <li  onClick={() => setLinkIndex(1)} className={linkIndex === 1 ? "focusedNavbar" : ""}>
              <Link  to="/contrast">Contrast</Link>
            </li>
            <li  onClick={() => setLinkIndex(2)} className={linkIndex === 2 ? "focusedNavbar" : ""}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </header>
      </div>
      {contrast ?   <>
            <div className="wrapper">
              <div
                style={{
                  backgroundColor: `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`,
                  color: `rgb(${colorText.r},${colorText.g},${colorText.b},${colorText.a})`,
                  backgroundImage: `url(${bkImage})`,
                }}
                className="Board"
              >
                This is board
              </div>

              <div className="menu">
                <Menu
                  backToNavbar={(returningToNavBar) => returnToNavBar(returningToNavBar)}
                  colorText={colorText}
                  backgroundColor={backgroundColor}
                  getColor={(color, isText) => getColor(color, isText)}
                  changeBk={changeBk}
                  imageDB={imageDB}
                />
              </div>
            </div>
            <footer className="instructions"> Instructions </footer>
          </> : ""}
      <Switch>
        <Route path="/about">
          <h1  >This is about us</h1>
        </Route>
        <Route path="/contrast">
          <>
            <div className="wrapper">
              <div
                style={{
                  backgroundColor: `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`,
                  color: `rgb(${colorText.r},${colorText.g},${colorText.b},${colorText.a})`,
                  backgroundImage: `url(${bkImage})`,
                }}
                className="Board"
              >
                This is board
              </div>

              <div className="menu">
                <Menu
                  backToNavbar={(returningToNavBar) => returnToNavBar(returningToNavBar)}
                  colorText={colorText}
                  backgroundColor={backgroundColor}
                  getColor={(color, isText) => getColor(color, isText)}
                  changeBk={changeBk}
                  imageDB={imageDB}
                />
              </div>
            </div>
            <footer className="instructions"> Instructions </footer>
          </>
        </Route>
        <Route path="/">
          <h1>This is Home</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
