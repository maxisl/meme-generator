import React, { useState, useEffect } from "react";
import axios from "axios";
import TemplateCard from "../Template/TemplateCard.jsx";

const MemeGenerator = () => {
  const [template, setTemplate] = useState(null);
  const [templates, setTemplates] = useState(null);
  const [textTop, setTextTop] = useState("");
  const [textBottom, setTextBottom] = useState("");

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/templates`).then((response) => {
        setTemplates(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
  };

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
    <div className="meme-generator">
      <h2>Create a Meme</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="template-select">Select a template:</label>
          <select id="template-select" onChange={handleTemplateChange}>
            <option value="">Select a template</option>
            <option value="1">Template 1</option>
            <option value="2">Template 2</option>
            <option value="3">Template 3</option>
          </select>
          <div>
            <TemplateCard template={ template } />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="text-top">Top text:</label>
          <input
            type="text"
            id="text-top"
            value={textTop}
            onChange={handleTextTopChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text-bottom">Bottom text:</label>
          <input
            type="text"
            id="text-bottom"
            value={textBottom}
            onChange={handleTextBottomChange}
          />
        </div>
        <button type="submit">Create Meme</button>
      </form>
    </div>
  );
};

export default MemeGenerator;
