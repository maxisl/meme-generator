import React from "react";

const LogoutButton = ({ setIsLoggedIn, setUserName }) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    console.log("Logged out");
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
