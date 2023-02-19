import React from "react";
import MemeCard from "./MemeCard";

const MemeList = ({ memes }) => {
  return (
    <div className="meme-list">
      {memes.map((meme) => (
        <MemeCard key={meme._id} meme={meme} />
      ))}
    </div>
  );
};

export default MemeList;
