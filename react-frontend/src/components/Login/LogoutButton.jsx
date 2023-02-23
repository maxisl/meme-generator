import React from "react";

const LogoutButton = ({ setIsLoggedIn }) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
