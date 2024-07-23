import React, { useState } from 'react';
import './BoxPreview.css';
import PreviewItems from '../PreviewItems/PreviewItems';

const BoxPreview = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
  };

  return (
    <div className="box-preview">
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
              onClick={() => handleClick('Photos')}
            />
            <area 
              alt="Gift" 
              title="Gift" 
              coords="100,290,230,400" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Gift')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Gift')}
            />
            <area 
              alt="Cassette Tape" 
              title="Music" 
              coords="90,410,240,510" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Music')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Music')}
            />
            <area 
              alt="Video Camera" 
              title="Videos" 
              coords="255,70,510,260" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Videos')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Videos')}
            />
            <area 
              alt="Microphone" 
              title="Voice Notes" 
              coords="255,275,520,330" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Voice Notes')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Voice Notes')}
            />
            <area 
              alt="Letters" 
              title="Letters" 
              coords="255,360,520,510" 
              shape="rect" 
              onMouseEnter={() => handleMouseEnter('Letters')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('Letters')}
            />
          </map>
          {['Photos', 'Gift', 'Music', 'Videos', 'Voice Notes', 'Letters'].map(item => (
            <div 
              key={item}
              className={`overlay ${item.toLowerCase().replace(' ', '-')}`}
              style={{ display: hoveredItem === item ? 'block' : 'none' }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <PreviewItems item={selectedItem} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default BoxPreview;
