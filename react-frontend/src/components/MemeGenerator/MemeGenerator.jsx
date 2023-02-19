// TODO Meme Generator

import React, { useState } from 'react';
import axios from 'axios';

const MemeGenerator = () => {
  // Initialize state for top and bottom text inputs
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  // Initialize state for random image URL
  const [randomImg, setRandomImg] = useState('');

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'topText') {
      setTopText(value);
    } else if (name === 'bottomText') {
      setBottomText(value);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO should not be random - make a request to the API to get a random meme image
    axios.get('http://localhost:3001/memes')
    .then((response) => {
      const memes = response.data.data.memes;
      const randomIndex = Math.floor(Math.random() * memes.length);
      const randomMeme = memes[randomIndex];
      setRandomImg(randomMeme.url);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Top text:
          <input type="text" name="topText" value={topText} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Bottom text:
          <input type="text" name="bottomText" value={bottomText} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Generate Meme</button>
      </form>
      {randomImg && (
        <img src={randomImg} alt="Random meme" />
      )}
    </div>
  );
};

export default MemeGenerator;
