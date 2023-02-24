import React, { useState, useEffect } from "react";
import mememucLogo from "./assets/MEMEMUC_rounded.png";
import "./App.css";
import MemeList from "./components/MemeList/MemeList.jsx";
import MemeGenerator from "./components/MemeGenerator/MemeGenerator.jsx";
import Login from "./components/Login/Login.jsx";
import LogoutButton from "./components/Login/LogoutButton.jsx";
import UploadTemplateButton from "./components/Template/UploadTemplateButton.jsx";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [serverAvailable, setServerAvailable] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/").catch(() => {
      setServerAvailable(false);
    });
  }, []);

  // attach the beforeunload event listener when app starts
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // clear the local storage when beforeunload event is fired
  const handleBeforeUnload = (event) => {
    localStorage.clear();
  };

  return (
    <div className="App">
      {!serverAvailable && (
        <div className="server-not-available">
          <p>Server is not available. Please try again later.</p>
        </div>
      )}
      {serverAvailable && (
        <>
          <div className="logo-and-login">
            <div className="logo">
              <img src={mememucLogo} alt="logo" />
            </div>
            <div className="Login">
              {isLoggedIn ? (
                <div>
                  <p>Welcome {userName}!</p>
                  <LogoutButton
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                </div>
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
              )}
            </div>
          </div>
          <div className="card">
            <div className="meme-generator-and-upload">
              <MemeGenerator />
              <UploadTemplateButton isLoggedIn={isLoggedIn} />
            </div>
            <MemeList />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
