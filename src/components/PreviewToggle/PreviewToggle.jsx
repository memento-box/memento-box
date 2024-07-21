// PreviewToggle.jsx
import React from 'react';
import BoxPreview from '../BoxPreview/BoxPreview';
import './PreviewToggle.css';

const PreviewToggle = ({ box, boxImage, closePreview }) => {
  const handleClickOutside = (e) => {
    if (e.target.className === 'preview-overlay') {
      closePreview();
    }
  };

  return (
    <div className="preview-overlay" onClick={handleClickOutside}>
      <div className="preview-content">
        <button className="close-button" onClick={closePreview}>X</button>
        <BoxPreview box={box} boxImage={boxImage} />
      </div>
    </div>
  );
};

export default PreviewToggle;
