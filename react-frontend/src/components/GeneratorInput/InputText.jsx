import React, { useState } from "react";
import "./InputText.css";

const InputText = () => {
  const [textTop, setTextTop] = useState("");
  const [textBottom, setTextBottom] = useState("");

  const handleTextTopChange = (event) => {
    setTextTop(event.target.value);
  };

  const handleTextBottomChange = (event) => {
    setTextBottom(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Upload meme to server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-input">
        <div className="text-input-top">
          <label htmlFor="text-top">Top text:</label>
          <input
            type="text"
            id="text-top"
            value={textTop}
            onChange={handleTextTopChange}
          />
        </div>
        <div className="text-input-bottom">
          <label htmlFor="text-bottom">Bottom text:</label>
          <input
            type="text"
            id="text-bottom"
            value={textBottom}
            onChange={handleTextBottomChange}
          />
        </div>
      </div>
    </form>
  );
};

export default InputText;
