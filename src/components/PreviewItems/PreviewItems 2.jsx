// PreviewItems.jsx
import React, { useEffect, useRef } from 'react';
import './PreviewItems.css';

const PreviewItems = ({ item, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!item) return null;

  const renderContent = () => {
    switch (item) {
      case 'Photos':
        return (
          <div>
            <h2>Photos</h2>
            <img src="/example-photo1.jpg" alt="Example Photo 1" />
            <img src="/example-photo2.jpg" alt="Example Photo 2" />
          </div>
        );
      case 'Gift':
        return <h2>Gift Details</h2>;
      case 'Music':
        return <h2>Music Details</h2>;
      case 'Videos':
        return <h2>Videos Details</h2>;
      case 'Voice Notes':
        return <h2>Voice Notes Details</h2>;
      case 'Letters':
        return <h2>Letters Details</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="preview-items">
      <div ref={modalRef} className="preview-items-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default PreviewItems;
