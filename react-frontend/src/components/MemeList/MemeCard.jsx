import React, { useState, useEffect } from "react";
import axios from "axios";

function MemeCard() {
  const [author, setAuthor] = useState(null);
  const [meme, setMeme] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(true);

  const id = "63caeb60db8428f94fc619e0";

  const fetchAuthor = async (id) => {
    try {
      await axios
        .get(`http://localhost:3001/users/63c9a9a5abd0048bf96855a6`)
        .then((response) => {
          console.log(response.data);
          console.log(response.data);
          setAuthor(response.data.user.name); // pass response data here
          setLoadingAuthor(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/memes/${id}`).then((response) => {
        console.log(response.data);
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
          <p>Author: {author}</p>
          <h2>{meme.title}</h2>
          <img src={meme.image} alt={meme.title} />
          <p>Tags: {meme.tags.join(", ")}</p>
          <p>Likes: {meme.likeCount}</p>
          <p>Comments: {meme.commentCount}</p>
        </>
      )}
    </div>
  );
}

export default MemeCard;
