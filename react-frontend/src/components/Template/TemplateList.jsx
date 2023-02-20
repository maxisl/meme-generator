import React, { useState, useEffect } from "react";
import axios from "axios";
import TemplateCard from "./TemplateCard.jsx";
import "./TemplateList.css";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/templates`).then((response) => {
        setTemplates(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="template-list-container">
      <div className="template-list">
        {templates.map((template) => (
          <TemplateCard key={template._id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default TemplateList;
