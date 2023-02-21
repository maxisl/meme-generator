import React, { useState } from "react";
import "./ImageCanvas.css";
import InputText from "../GeneratorInput/InputText.jsx";

// receives the selected template as props.selectedTemplate
const ImageCanvas = (props) => {
  const {fontSize, fontColor, fontFamily } = props;
  //const text = props.textTop + " " + props.textBottom;
  const text = "Hello World";
  const image = `http://localhost:3001/${props.selectedTemplate.path}`;

  const canvasRef = React.useRef(null);

  console.log("selectedTemplate: " + props.selectedTemplate._id);
  console.log("selectedTemplate image: " + props.selectedTemplate.path);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = () => {
      const x = (canvas.width - imageObj.width) / 2;
      const y = (canvas.height - imageObj.height) / 2;
      context.drawImage(imageObj, x, y);
      context.font = `${fontSize}px ${fontFamily}`;
      context.fillStyle = fontColor;
      context.textAlign = "center";
      context.fillText(text, canvas.width / 2, canvas.height / 2);
    };
  }, [image, text, fontSize, fontColor, fontFamily]);

  return (
    <div className="image-inputs-and-canvas ">
      <div className="image-canvas">
        <div className="input-container">
          <InputText />
        </div>
        <canvas ref={canvasRef} width={500} height={350} />
      </div>
    </div>
  );
};

export default ImageCanvas;
