import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import mememucLogo from "./assets/MEMEMUC_rounded.png";
import "./App.css";
import TemplateList from "./components/Template/TemplateList.jsx";
import MemeList from "./components/MemeList/MemeList.jsx";
import MemeGenerator from "./components/MemeGenerator/MemeGenerator.jsx";


function App() {

  return (
    <div className="App">
      <div className="logo">
          <img src={mememucLogo} alt="logo" />
      </div>
      <div className="card">
        <MemeGenerator />
        <MemeList />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
