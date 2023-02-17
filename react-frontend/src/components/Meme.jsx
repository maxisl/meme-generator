import React from "react";


const Meme = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.author}</h2>
      <h2>{props.date}</h2>
    </div>
  );
}

export default Meme;