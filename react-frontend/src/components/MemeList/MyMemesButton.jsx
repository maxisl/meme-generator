import React from "react";
import { Link } from "react-router-dom";

const MyMemesButton = () => {
  return (
    <Link to="/my-memes">
      <button>Display My Memes</button>
    </Link>
  );
};

export default MyMemesButton;
