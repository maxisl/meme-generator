import React, { useState } from "react";
import mememucLogo from "./assets/MEMEMUC_rounded.png";
import "./App.css";
import MemeList from "./components/MemeList/MemeList.jsx";
import MemeGenerator from "./components/MemeGenerator/MemeGenerator.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
  return (
    <div className="App">
      <div className="logo-and-login">
        <div className="logo">
          <img src={mememucLogo} alt="logo" />
        </div>
        <div className="Login">
          <Login />
        </div>
      </div>
      <div className="card">
        <MemeGenerator />
        <MemeList />
      </div>
    </div>
  );
}

export default App;
