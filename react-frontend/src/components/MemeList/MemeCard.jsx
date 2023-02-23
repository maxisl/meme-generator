import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MemeCard.css";

function MemeCard(props) {
  const [author, setAuthor] = useState(null);
  const [meme, setMeme] = useState(null);

  const fetchAuthor = async (id) => {
    try {
      await axios.get(`http://localhost:3001/users/${id}`).then((response) => {
        setAuthor(response.data.user.name); // pass response data here
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/memes/${props.meme._id}`)
        .then((response) => {
          setMeme(response.data); // pass response data here
          fetchAuthor(response.data.author);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!meme /*|| !author*/) {
    return <div>Loading...</div>;
  }

  return (
    <div className="meme-card">
      <div className="meme-card__image-container">
        <img
          src={`http://localhost:3001/${meme.path}`}
          alt={meme.title}
          className="meme-card__image"
        />
      </div>
      <div className="meme-card__content">
        <h2 className="meme-card__title">{meme.title}</h2>
        <p className="meme-card__author">Author: {author}</p>
        <p className="meme-card__tags">Tags: {meme.tags.join(", ")}</p>
        <p className="meme-card__likes">Likes: {meme.likeCount}</p>
        <p className="meme-card__comments">Comments: {meme.commentCount}</p>
      </div>
    </div>
  );
}

export default MemeCard;
