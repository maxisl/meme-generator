import React from "react";
import "./UploadTemplateButton.css";
import axios from "axios";

const UploadTemplateButton = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <div className="upload-template">
      <label htmlFor="template-file">Upload your own Template! </label>
      <input type="file" id="template-file" accept="image/png" />
    </div>
  ) : null;
};

export default UploadTemplateButton;
