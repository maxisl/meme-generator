import React from "react";
import "./UploadTemplateButton.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const UploadTemplateButton = ({ isLoggedIn }) => {
  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const extension = file.name.split(".").pop();
      const newName = uuidv4() + "." + extension;

      // Create a new image object
      const image = new Image();
      image.src = URL.createObjectURL(file);

      // Wait for the image to load
      await new Promise((resolve) => (image.onload = resolve));

      // Get the canvas element and context
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set the canvas dimensions
      const maxWidth = 500; // set the maximum width of the canvas
      const maxHeight = 500; // set the maximum height of the canvas
      let width = image.width;
      let height = image.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, width, height);

      // Convert the canvas to a Blob
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append("template", blob, newName);
        formData.append("name", newName);
        const response = axios.post(
          "http://localhost:3001/templates/",
          formData
        );
        console.log("Template uploaded successfully", response.data);
      }, file.type, 0.9);
    } catch (error) {
      console.error("Failed to upload template", error);
    }
  };


  return isLoggedIn ? (
    <div className="upload-template">
      <label htmlFor="template-file">Upload your own Template! </label>
      <input
        type="file"
        id="template-file"
        accept="image/png, image/jpeg"
        onChange={handleFileUpload}
      />
    </div>
  ) : null;
};

export default UploadTemplateButton;
