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
    switch(box) {
      case 'box1':
        return (
          <div className="box-content">
            <div className="image-container">
              <img src="/RecipientBoxOpen.png" alt="Black Angled Box" useMap="#image-map" />
              <map name="image-map">
                <area 
                  alt="Video Camera" 
                  title="Video Camera" 
                  coords="50,50,150,150" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('video-camera')} 
                  onMouseLeave={handleMouseLeave}
                />
                <area 
                  alt="Camera" 
                  title="Camera" 
                  coords="200,200,300,300" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('camera')} 
                  onMouseLeave={handleMouseLeave}
                />
                <area 
                  alt="Microphone" 
                  title="Microphone" 
                  coords="350,350,450,450" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('microphone')} 
                  onMouseLeave={handleMouseLeave}
                />
                <area 
                  alt="Letters" 
                  title="Letters" 
                  coords="500,500,600,600" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('letters')} 
                  onMouseLeave={handleMouseLeave}
                />
              </map>
              {hoveredItem === 'video-camera' && <div className="overlay video-camera">Videos</div>}
              {hoveredItem === 'camera' && <div className="overlay camera">Photos</div>}
              {hoveredItem === 'microphone' && <div className="overlay microphone">Voice Notes</div>}
              {hoveredItem === 'letters' && <div className="overlay letters">Letters</div>}
            </div>
            <h4>Items inside the Black Angled Box:</h4>
            <ul>
              <li>Photos</li>
              <li>Letters</li>
              <li>Voice Notes</li>
              <li>Videos</li>
            </ul>
          </div>
        );
      case 'box2':
        return (
          <div className="box-content">
            <div className="image-container">
              <img src="/RecipientBoxOpen.png" alt="White Ribbon Box" useMap="#image-map" />
              <map name="image-map">
                <area 
                  alt="Video Camera" 
                  title="Video Camera" 
                  coords="50,50,150,150" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('video-camera')} 
                  onMouseLeave={handleMouseLeave}
                />
                <area 
                  alt="Camera" 
                  title="Camera" 
                  coords="200,200,300,300" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('camera')} 
                  onMouseLeave={handleMouseLeave}
                />
                <area 
                  alt="Microphone" 
                  title="Microphone" 
                  coords="350,350,450,450" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('microphone')} 
                  onMouseLeave={handleMouseLeave}
                />
                <area 
                  alt="Letters" 
                  title="Letters" 
                  coords="500,500,600,600" 
                  shape="rect" 
                  onMouseEnter={() => handleMouseEnter('letters')} 
                  onMouseLeave={handleMouseLeave}
                />
              </map>
              {hoveredItem === 'video-camera' && <div className="overlay video-camera">Videos</div>}
              {hoveredItem === 'camera' && <div className="overlay camera">Photos</div>}
              {hoveredItem === 'microphone' && <div className="overlay microphone">Voice Notes</div>}
              {hoveredItem === 'letters' && <div className="overlay letters">Letters</div>}
            </div>
            <h4>Items inside the White Ribbon Box:</h4>
            <ul>
              <li>Photos</li>
              <li>Letters</li>
              <li>Voice Notes</li>
              <li>Videos</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="box-preview">
      {renderContent()}
    </div>
  );
};

export default BoxPreview;
