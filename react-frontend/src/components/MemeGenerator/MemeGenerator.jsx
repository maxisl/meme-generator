import React, { useState } from "react";
import TemplateList from "../Template/TemplateList.jsx";
import ImageCanvas from "../ImageCanvas/ImageCanvas.jsx";
import "./MemeGenerator.css";

const MemeGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(50);
  // TODO make position defaults relative to canvas size
  const [positionBottomX, setPositionBottomX] = useState(250);
  const [positionBottomY, setPositionBottomY] = useState(350);
  const [positionTopX, setPositionTopX] = useState(250);
  const [positionTopY, setPositionTopY] = useState(150);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleXBottomChange = (event) => {
    setPositionBottomX(event.target.value);
  };

  const handleYBottomChange = (event) => {
    setPositionBottomY(event.target.value);
  };

  const handleXTopChange = (event) => {
    setPositionTopX(event.target.value);
  };

  const handleYTopChange = (event) => {
    setPositionTopY(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="meme-generator">
      <form onSubmit={handleSubmit}>
        <div className="meme-editing">
          <div className="text-input-container">
            <div className="text-input-top">
              <label htmlFor="text-top">Top text:</label>
              <input
                type="text"
                id="text-top"
                value={topText}
                onChange={handleTopTextChange}
              />
            </div>
            <div className="position-top">
              <label htmlFor="position-x-top">x: </label>
              <input
                type="text"
                id="position-x-top"
                value={positionTopX}
                onChange={handleXTopChange}
              />
              <label htmlFor="position-y-top">y: </label>
              <input
                type="text"
                id="position-y-top"
                value={positionTopY}
                onChange={handleYTopChange}
              />
            </div>
            <div className="text-input-bottom">
              <label htmlFor="text-bottom">Bottom text:</label>
              <input
                type="text"
                id="text-bottom"
                value={bottomText}
                onChange={handleBottomTextChange}
              />
            </div>
            <div className="position-bottom">
              <label htmlFor="position-x-bottom">x: </label>
              <input
                type="text"
                id="position-x-bottom"
                value={positionBottomX}
                onChange={handleXBottomChange}
              />
              <label htmlFor="position-y-bottom">y: </label>
              <input
                type="text"
                id="position-y-bottom"
                value={positionBottomY}
                onChange={handleYBottomChange}
              />
            </div>
            <div className="font-size-input">
              <label htmlFor="font-size">Text Size: </label>
              <input
                type="text"
                value={fontSize}
                onChange={handleFontSizeChange}
              />
            </div>
          </div>
          <div className="image-canvas-container">
            <ImageCanvas
              selectedTemplate={selectedTemplate}
              topText={topText}
              bottomText={bottomText}
              textSize={fontSize}
              textXTop={positionTopX}
              textYTop={positionTopY}
              textXBottom={positionBottomX}
              textYBottom={positionBottomY}
            />
          </div>
        </div>
        <label htmlFor="template-select">Select a template:</label>
        <div className="template-list-container-generator">
          <TemplateList setSelectedTemplate={handleTemplateSelect} />
        </div>
      </form>
    </div>
  );
};

export default MemeGenerator;
