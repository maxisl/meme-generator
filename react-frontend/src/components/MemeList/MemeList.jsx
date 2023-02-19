import React, { useState, useEffect } from "react";
import MemeCard from "./MemeCard";
import "./MemeList.css";
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
    <div className="meme-list-container"> {/* add the container class */}
      <div className="meme-list"> {/* add the list class */}
      {memes.map((meme) => (
        <MemeCard key={meme._id} meme={meme}
        />
      ))}
      </div>
    </div>
  );
};

export default MemeList;
