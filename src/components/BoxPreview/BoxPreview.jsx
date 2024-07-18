import React, { useState, useRef, useEffect } from 'react';
import './BoxPreview.css';

const BoxPreview = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [overlayPosition, setOverlayPosition] = useState({ top: '0%', left: '0%' });
  const imageRef = useRef(null);

  const handleMouseEnter = (item, coords) => {
    const [x1, y1, x2, y2] = coords.split(',').map(Number);
    const img = imageRef.current;
    if (img) {
      const centerX = ((x1 + x2) / 2 / img.naturalWidth) * 100;
      const centerY = ((y1 + y2) / 2 / img.naturalHeight) * 100;
      setOverlayPosition({ top: `${centerY}%`, left: `${centerX}%` });
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const renderContent = () => {
    return (
      <div className="box-content">
        <div className="image-container">
          <img ref={imageRef} src="/RecipientBoxOpen.png" alt="Box" useMap="#image-map" />
          <map name="image-map">
            <area 
              alt="Camera" 
              title="Photos" 
              coords="100,70,230,285" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Photos', '100,70,230,285')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Gift" 
              title="Gift" 
              coords="100,290,230,400" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Gift', '100,290,230,400')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Cassette Tape" 
              title="Music" 
              coords="90,410,240,510" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Music', '90,410,240,510')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Video Camera" 
              title="Videos" 
              coords="255,70,510,260" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Videos', '255,70,510,260')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Microphone" 
              title="Voice Notes" 
              coords="255,275,520,330" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Voice Notes', '255,275,520,330')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Letters" 
              title="Letters" 
              coords="255,360,520,510" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Letters', '255,360,520,510')} 
              onMouseLeave={handleMouseLeave}
            />
          </map>
          {hoveredItem && (
            <div
              className={`overlay ${hoveredItem.toLowerCase().replace(' ', '-')}`}
              style={{ top: overlayPosition.top, left: overlayPosition.left }}
            >
              {hoveredItem}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="box-preview">
      {renderContent()}
    </div>
  );
};

export default BoxPreview;
