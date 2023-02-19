// TODO list of all memes

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemeList = () => {
  // Initialize state for the list of memes
  const [memes, setMemes] = useState([]);

  // Function to fetch the list of memes from the server
  const fetchMemes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/memes');
      setMemes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the list of memes when the component mounts
  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <div className="meme-list">
      <div className="container">
        <div className="row">
          {memes.map((meme) => (
            <div key={meme._id} className="col-md-4">
              <div className="card">
                <img src={meme.image} className="card-img-top" alt={meme.title} />
                <div className="card-body">
                  <h5 className="card-title">{meme.title}</h5>
                  <p className="card-text">Uploaded by {meme.author}</p>
                  <a href="#" className="btn btn-primary">View</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeList;
