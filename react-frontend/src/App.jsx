import React, { useState } from "react";
import mememucLogo from "./assets/MEMEMUC_rounded.png";
import "./App.css";
import MemeList from "./components/MemeList/MemeList.jsx";
import MemeGenerator from "./components/MemeGenerator/MemeGenerator.jsx";
import Login from "./components/Login/Login.jsx";
import LogoutButton from "./components/Login/LogoutButton.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <div className="logo-and-login">
        <div className="logo">
          <img src={mememucLogo} alt="logo" />
        </div>
        <div className="Login">
          {isLoggedIn ? (
            <LogoutButton setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
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
