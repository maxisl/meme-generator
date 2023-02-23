import React, { useState } from "react";
import "./ImageCanvas.css";
import html2canvas from "html2canvas";
import axios from "axios";

const ImageCanvas = (props) => {
  const { fontColor, fontFamily } = props;
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 350 });
  const topText = props.topText;
  const bottomText = props.bottomText;
  const fontSize = props.textSize;
  const positionXBottom = props.textXBottom;
  const positionYBottom = props.textYBottom;
  const positionXTop = props.textXTop;
  const positionYTop = props.textYTop;

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.crossOrigin = "anonymous";
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
      context.fillText(topText, positionXTop, positionYTop);
      context.fillText(bottomText, positionXBottom, positionYBottom);
    };
  }, [
    props.selectedTemplate,
    canvasSize,
    fontSize,
    fontColor,
    fontFamily,
    topText,
    bottomText,
    positionXBottom,
    positionYBottom,
    positionXTop,
    positionYTop,
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

  const handleDownload = () => {
    const canvas = canvasRef.current;
    html2canvas(canvas).then(function (canvas) {
      const link = document.createElement("a");
      document.body.appendChild(link);
      // TODO enable setting a custom name for the meme
      link.download = "meme.png";
      link.href = canvas.toDataURL();
      link.click();
      document.body.removeChild(link);

      // Convert canvas data to blob
      canvas.toBlob((blob) => {
        const formData = new FormData();
        const author = "63c9a9a5abd0048bf96855a6";
        const title = "Template 1";
        formData.append("image", blob, "meme.png");
        formData.append("author", author);
        formData.append("title", title);

        // Send POST request to store the template using Axios
        axios
          .post("http://localhost:3001/memes", formData)
          .then((response) => {
            console.log("Meme stored successfully", response.data);
          })
          .catch((error) => {
            console.error("Failed to store meme", error);
          });
      });
    });
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
      <button onClick={handleDownload}>Generate Meme</button>
    </div>
  );
};

export default ImageCanvas;
