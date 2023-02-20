import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchAuthor from "../MemeList/MemeCard";

function TemplateCard(props) {
  const [author, setAuthor] = useState(null);
  const [template, setTemplate] = useState(null);

  const fetchAuthor = async (id) => {
    try {
      await axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setAuthor(response.data.user.name); // pass response data here
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/templates/${props.template._id}`).then((response) => {
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
    <div className="meme-card">
      <div className="meme-card__image-container">
        <img src={`http://localhost:3001/${template.path}`} alt={template.name} className="meme-card__image" />
      </div>
      <div className="meme-card__content">
        <h2 className="meme-card__title">{template.name}</h2>
        {/*<p className="meme-card__author">Author: {author}</p>*/}
      </div>
    </div>
  );
}

export default TemplateCard;
