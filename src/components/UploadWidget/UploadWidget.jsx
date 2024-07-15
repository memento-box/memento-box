import React, { useEffect } from 'react';
import Axios from 'axios';

const UploadWidget = ({ onUpload }) => {
  useEffect(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'ddwxzpezz',
        uploadPreset: 'MEMENTO_BOX_ERIK_SILCOX',
      },
      (error, result) => {
        if(!error && result && result.event === 'success') {
          onUpload(result.info);
        }else if (error) {
          console.error('Upload Widget Error:', error);
        }
      }
    );
    document.getElementById('upload_widget').addEventListener(
      'click',
      () => {
        widget.open();
      },
      false
    );
  }, [onUpload]);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  );
};

export default UploadWidget;