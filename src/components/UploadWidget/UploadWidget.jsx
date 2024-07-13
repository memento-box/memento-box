import React, { useEffect } from 'react';

const UploadWidget = ({ onUpload }) => {
  useEffect(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'ddwxzpezz',
        uploadPresent: 'MEMENTO_BOX_ERIK_SILCOX',
      },
      (error, results) => {
        if(!error && result && result.event === 'success') {
          onUpload(result.info);
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