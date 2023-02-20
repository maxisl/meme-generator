import React, { useState, useEffect } from "react";
import "../MemeGenerator/MemeGenerator.css";
import InputText from "../GeneratorInput/InputText.jsx";
import TemplateList from "../Template/TemplateList.jsx";
import ImageCanvas from "../ImageCanvas/ImageCanvas.jsx";

const MemeGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Generate and upload the meme image
  };

  return (
    <div className="meme-generator">
      <ImageCanvas />
      {/*<div className="template-container">
        selectedTemplate ? <TemplateCard template={selectedTemplate} /> :
        "Select a template"}
      </div>*/}
      <label htmlFor="template-select">Select a template:</label>
      <div className="template-list-container-generator">
        <TemplateList onTemplateSelect={handleTemplateSelect} />
      </div>
      <button type="submit">Create Meme</button>
    </div>
  );
};

export default MemeGenerator;