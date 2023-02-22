import React, { useState } from "react";
import "./ImageCanvas.css";

const ImageCanvas = (props) => {
  const { fontColor, fontFamily } = props;
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 350 });
  const topText = props.topText;
  const bottomText = props.bottomText;
  const fontSize = props.textSize;

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.src = `http://localhost:3001/${props.selectedTemplate.path}`;
    imageObj.onload = () => {
      const aspectRatio = imageObj.width / imageObj.height;
      const canvasWidth = canvasSize.width;
      const canvasHeight = canvasWidth / aspectRatio;
      canvas.height = canvasHeight;
      const x = (canvasWidth - imageObj.width) / 2;
      const y = (canvasHeight - imageObj.height) / 2;
      context.drawImage(imageObj, x, y);
      context.font = `${fontSize}px ${fontFamily}`;
      context.fillStyle = fontColor;
      context.textAlign = "center";
      context.fillText(bottomText, canvas.width / 2, (canvas.height / 3) * 2);
      context.fillText(topText, canvas.width / 2, canvas.height / 3);
    };
  }, [
    props.selectedTemplate,
    canvasSize,
    fontSize,
    fontColor,
    fontFamily,
    topText,
    bottomText
  ]);

  const handleImageLoad = (event) => {
    const canvas = canvasRef.current;
    const imageObj = event.target;
    const aspectRatio = imageObj.width / imageObj.height;
    const canvasWidth = 500;
    const canvasHeight = canvasWidth / aspectRatio;
    setCanvasSize({ width: canvasWidth, height: canvasHeight });
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="image-inputs-and-canvas ">
      <div className="image-canvas">
        <canvas ref={canvasRef} width={500} height={350} />
        <img
          onLoad={handleImageLoad}
          src={`http://localhost:3001/${props.selectedTemplate.path}`}
          alt="Selected template"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageCanvas;
