import React, { useState, useEffect } from "react";
import "../MemeGenerator/MemeGenerator.css";
import InputText from "../GeneratorInput/InputText.jsx";
import TemplateList from "../Template/TemplateList.jsx";
import ImageCanvas from "../ImageCanvas/ImageCanvas.jsx";

const MemeGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleTextTopChange = (event) => {
    setTopText(event.target.value);
  };

  const handleTextBottomChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Generate and upload the meme image
  };

  return (
    <div className="meme-generator">
      <ImageCanvas selectedTemplate={selectedTemplate} />
      <label htmlFor="template-select">Select a template:</label>
      <div className="template-list-container-generator">
        <TemplateList setSelectedTemplate={handleTemplateSelect} />
      </div>
      <div className="text-input-container">
        <InputText
          topText={topText}
          setTopText={handleTextTopChange}
          bottomText={bottomText}
          setBottomText={handleTextBottomChange}
        />
      </div>
      <button type="submit">Create Meme</button>
    </div>
  );
};

export default MemeGenerator;
