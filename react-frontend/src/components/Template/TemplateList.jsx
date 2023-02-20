import React, { useState, useEffect } from "react";
import axios from "axios";
import TemplateCard from "./TemplateCard.jsx";

const TemplateList = () => {
  const [template, setTemplate] = useState("");
  const [templates, setTemplates] = useState([]);
  const [textTop, setTextTop] = useState("");
  const [textBottom, setTextBottom] = useState("");

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/templates`).then((response) => {
        setTemplates(response.data);
        console.log(response.data);
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
    <div className="template-list">
      <h2>Create a Meme</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
          <label htmlFor="template-select">Select a template:</label>
          <div className="template-list-container">
            <div className="template-list">
              {templates.map((template) => (
                <TemplateCard key={template._id} template={template} />
              ))}
            </div>
          </div>
        </div>
        <button type="submit">Create Meme</button>
      </form>
    </div>
  );
};

export default TemplateList;
