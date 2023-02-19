import React from "react";
// import "./GenerateMemeButton.css";
const GenerateMemeButton = () => {
  return (
    <button className="generate-meme-button" onClick={() => console.log("clicked")}>
      Generate Own Meme
    </button>
  );
};

export default GenerateMemeButton;