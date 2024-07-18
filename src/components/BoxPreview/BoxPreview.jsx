import React, { useState } from 'react';
import './BoxPreview.css';

const BoxPreview = ({ box }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const renderContent = () => {
    return (
      <div className="box-content">
        <div className="image-container">
          <img src="/RecipientBoxOpen.png" alt="Box" useMap="#image-map" />
          <map name="image-map">
            <area 
              alt="Camera" 
              title="Photos" 
              coords="100,70,230,285" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Photos')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Gift" 
              title="Gift" 
              coords="100,290,230,400" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Gift')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Cassette Tape" 
              title="Music" 
              coords="90,410,240,510" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Music')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Video Camera" 
              title="Videos" 
              coords="255,70,510,260" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Videos')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Microphone" 
              title="Voice Notes" 
              coords="255,275,520,330" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Voice Notes')} 
              onMouseLeave={handleMouseLeave}
            />
            <area 
              alt="Letters" 
              title="Letters" 
              coords="255,360,520,510" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Letters')} 
              onMouseLeave={handleMouseLeave}
            />
          </map>
          {hoveredItem && (
            <div className={`overlay ${hoveredItem.toLowerCase().replace(' ', '-')}`}>
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
