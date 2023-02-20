import React, { useState, useEffect } from "react";
import "../MemeGenerator/MemeGenerator.css";
import InputText from "../GeneratorInput/InputText.jsx";
import TemplateList from "../Template/TemplateList.jsx";

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
      {/*<div className="template-container">
        selectedTemplate ? <TemplateCard template={selectedTemplate} /> :
        "Select a template"}
      </div>*/}
      <div className="input-container">
        <InputText />
      </div>

      <div className="template-list-container-generator">
        <TemplateList onTemplateSelect={handleTemplateSelect} />
      </div>
    </div>
  );
};

export default MemeGenerator;