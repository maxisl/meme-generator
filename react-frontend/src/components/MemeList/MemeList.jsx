import React, { useState, useEffect } from "react";
import MemeCard from "./MemeCard";
import GenerateMemeButton from "./GenerateMemeButton";
import "./MemeList.css";
import axios from "axios";

const MemeList = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:3001/memes`).then((response) => {
        setMemes(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="meme-list-container">
      <div className="meme-list">
      {memes.map((meme) => (
        <MemeCard key={meme._id} meme={meme}
        />
      ))}
      </div>
    </div>
  );
};

export default MemeList;
