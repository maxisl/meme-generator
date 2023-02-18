import React, { useState } from 'react';

const MemeEditor = () => {
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');

  const handleTextTopChange = (e) => {
    setTextTop(e.target.value);
  };

  const handleTextBottomChange = (e) => {
    setTextBottom(e.target.value);
  };

  return (
      <div>
        <input
            type="text"
            placeholder="Top Text"
            value={textTop}
            onChange={handleTextTopChange}
        />
        <br />
        <input
            type="text"
            placeholder="Bottom Text"
            value={textBottom}
            onChange={handleTextBottomChange}
        />
        <br />
        <img
            src="http://your-meme-image-url-here.com/meme.jpg"
            alt="Meme"
        />
        <br />
        <p style={{ position: 'absolute', top: '20px', left: '50px', fontSize: '24px' }}>
          {textTop}
        </p>
        <p style={{ position: 'absolute', bottom: '20px', left: '50px', fontSize: '24px' }}>
          {textBottom}
        </p>
      </div>
  );
};

export default MemeEditor;
