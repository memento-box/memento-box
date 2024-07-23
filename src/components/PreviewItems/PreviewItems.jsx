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
            <div className="image-container">
              <img src="/example/Frame 7.png" alt="Frame 7" />
              <p>Remember this time!</p>
            </div>
            <div className="image-container">
              <img src="/example/Frame 8.png" alt="Frame 8" />
              <p>What a great moment!</p>
            </div>
            <div className="image-container">
              <img src="/example/Frame 9.png" alt="Frame 9" />
              <p>I can't believe we did this.</p>
            </div>
            <div className="image-container">
              <img src="/example/Frame 10.png" alt="Frame 10" />
              <p>Unforgettable memories!</p>
            </div>
            <div className="image-container">
              <img src="/example/Frame 12.png" alt="Frame 12" />
              <p>Such a special day!</p>
            </div>
          </div>
        );
      case 'Videos':
        return (
          <div>
            <h2>Videos</h2>
            <div className="image-container">
              <img src="/example/Frame 13.png" alt="Frame 13" />
              <p>Highlight of the day!</p>
            </div>
            <div className="image-container">
              <img src="/example/Frame 14.png" alt="Frame 14" />
              <p>Our fun times captured!</p>
            </div>
            <div className="image-container">
              <img src="/example/Frame 15.png" alt="Frame 15" />
              <p>Memories we'll cherish.</p>
            </div>
            <div className="image-container">
              <img src="/example/Frame 16.png" alt="Frame 16" />
              <p>Can't get enough of this!</p>
            </div>
          </div>
        );
      case 'Letters':
        return (
          <div>
            <h2>Letters</h2>
            <div className="image-container">
              <img src="/example/Frame 19.png" alt="Frame 19" />
              <p>A heartfelt letter!</p>
            </div>
          </div>
        );
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
