import React, { useState, useEffect } from "react";
import axios from "axios";

function MemeCard(props) {
  const [author, setAuthor] = useState(null);
  const [meme, setMeme] = useState(null);

  const fetchAuthor = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      const data = response.data;
      setAuthor(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeme = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/memes`);
      const memes = response.data.data.memes;
      const randomIndex = Math.floor(Math.random() * memes.length);
      const randomMeme = memes[randomIndex];
      setMeme(randomMeme);
      // fetchAuthor(randomMeme.author);
    } catch (error) {
      console.log(error);
    }
  };

  /*useEffect(() => {
    if (props.meme.author) {
      fetchAuthor(props.meme.author);
    }
  }, [props.meme.author]);
*/

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div className="meme-card">
      <h2>{props.meme.title}</h2>
      <img src={props.meme.image} alt={props.meme.title} />
      <p>Tags: {props.meme.tags.join(", ")}</p>
      {/*<p>By: {author ? author : 'Loading...'}</p>*/}
      <p>Likes: {props.meme.likeCount}</p>
      <p>Comments: {props.meme.commentCount}</p>
    </div>
  );
}

export default MemeCard;
