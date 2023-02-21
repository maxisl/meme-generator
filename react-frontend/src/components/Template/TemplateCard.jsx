import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TemplateCard.css";

function TemplateCard(props) {
  const [template, setTemplate] = useState(null);

  const handleTemplateSelect = () => {
    props.setSelectedTemplate(template);
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/templates/${props.template._id}`)
        .then((response) => {
          setTemplate(response.data);
          // fetchAuthor(response.data.author);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div className="template-card">
      <img
        src={`http://localhost:3001/${template.path}`}
        alt={template.name}
        onClick={handleTemplateSelect}
      />
    </div>
  );
}

export default TemplateCard;
