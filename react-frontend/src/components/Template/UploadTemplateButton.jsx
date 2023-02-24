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
      const formData = new FormData();
      formData.append("template", file);
      formData.append("name", newName);
      const response = await axios.post(
        "http://localhost:3001/templates/",
        formData
      );
      console.log("Template uploaded successfully", response.data);
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
        accept="image/png"
        onChange={handleFileUpload}
      />
    </div>
  ) : null;
};

export default UploadTemplateButton;
