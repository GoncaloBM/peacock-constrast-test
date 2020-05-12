import React from 'react';
import './App.css';
import Menu from "./components/Menu/Menu"



function App() {
  return (
    <div className="App">
      <header className="header">This is header</header>
    <div className="wrapper">
    <div className="Board">This is board</div>

<Menu />
    </div>

    <footer className="instructions"> Instructions </footer>
    </div>
  );
}

export default App;
