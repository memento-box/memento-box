// PreviewToggle.jsx
import React, { useEffect, useState } from 'react';
import BoxPreview from '../BoxPreview/BoxPreview';
import './PreviewToggle.css';

const PreviewToggle = ({ box, boxImage, closePreview }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (box) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [box]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('preview-overlay')) {
      closePreview();
    }
  };

  return (
    <div className={`preview-overlay ${isVisible ? 'show' : ''}`} onClick={handleClickOutside}>
      <div className={`preview-content ${isVisible ? 'slide-in' : ''}`}>
        <button className="close-button" onClick={closePreview}>X</button>
        <BoxPreview box={box} boxImage={boxImage} />
      </div>
    </div>
  );
};

export default PreviewToggle;
