import React, { useState, useEffect } from "react";
import axios from "axios";

function MemeCard(props) {
  const [author, setAuthor] = useState(null);
  const [meme, setMeme] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(true);

  console.log("Props in Memecard: " + props.meme._id);

  const fetchAuthor = async (id) => {
    try {
      await axios
        .get(`http://localhost:3001/users/${id}`)
        .then((response) => {
          console.log("Username: \n" + response.data.user.name);
          setAuthor(response.data.user.name); // pass response data here
          setLoadingAuthor(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/memes/${props.meme._id}`).then((response) => {
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
      {meme && (
        <>
          <h2>{meme.title}</h2>
          <img src={meme.image} alt={meme.title} />
          <p>Author: {author}</p>
          <p>Tags: {meme.tags.join(", ")}</p>
          <p>Likes: {meme.likeCount}</p>
          <p>Comments: {meme.commentCount}</p>
        </>
      )}
    </div>
  );
}

export default MemeCard;
