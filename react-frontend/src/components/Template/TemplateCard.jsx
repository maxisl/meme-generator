import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TemplateCard.css";

function TemplateCard(props) {
  const [author, setAuthor] = useState(null);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/templates/${props.template._id}`)
        .then((response) => {
          setTemplate(response.data); // pass response data here
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
        />
      </div>
  );
}

export default TemplateCard;
