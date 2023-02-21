import React, { useState } from "react";
import "./ImageCanvas.css";
import InputText from "../GeneratorInput/InputText.jsx";

// receives the selected template as props.selectedTemplate
const ImageCanvas = (props) => {
  const { image, text, fontSize, fontColor, fontFamily } = props;
  const canvasRef = React.useRef(null);

  console.log("selectedTemplate: " + props.selectedTemplate._id);


  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = () => {
      context.drawImage(imageObj, 0, 0);
      context.font = `${fontSize}px ${fontFamily}`;
      context.fillStyle = fontColor;
      context.textAlign = "center";
      context.fillText(text, canvas.width / 2, canvas.height / 2);
    };
  }, [image, text, fontSize, fontColor, fontFamily]);

  return (
    <div className="image-canvas">
      <div className="input-container">
        <InputText />
      </div>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}

export default ImageCanvas;