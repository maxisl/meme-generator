import React, { useState, useEffect } from "react";
import MemeCard from "./MemeCard";
import axios from "axios";

const MemeList = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/memes`).then((response) => {
        setMemes(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="meme-list">
      {memes.map((meme) => (
        <MemeCard key={meme._id} meme={meme}
        />
      ))}
    </div>
  );
};

export default MemeList;
