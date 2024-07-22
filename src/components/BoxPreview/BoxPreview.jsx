import React, { useState } from 'react';
import './BoxPreview.css';
import PreviewItems from '../PreviewItems/PreviewItems';
import { useHistory } from 'react-router-dom';

const BoxPreview = ({ box, boxImage, occasion }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const history = useHistory();

  const handleMouseEnter = (item) => {
    if (isBoxOpened) {
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (isBoxOpened) {
      setHoveredItem(null);
    }
  };

  const handleClick = (item) => {
    if (isBoxOpened) {
      setSelectedItem(item);
    }
  };

  const handleOpenBox = () => {
    setIsBoxOpened(true);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    history.push("/box-setup-information");
  };

  // Message and collaborators based on the selected box
  const message = box === 'box1' ? 'Congratulations to the Newlyweds!' : 'Happy 30th Birthday, Katie!';
  const collaborators = box === 'box1' 
    ? ["Alice", "Bob", "Charlie", "David"] 
    : ["Eve", "Frank", "Grace", "Heidi"];

  return (
    <div className="box-preview-container">
      <div className="content-container">
        {/* Container for Message and Collaborators */}
        <div className="info-container">
          <div className="message">{message}</div>
          <ul className="collaborators">
            From:
            {collaborators.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>

        <div className={`box-preview ${isBoxOpened ? 'box-opened' : ''}`}>
          <div className="box-images">
            {/* Closed Box Image */}
            <img
              src={boxImage}
              alt="Box"
              className={`closed-box ${isBoxOpened ? 'slide-out' : ''}`}
              onClick={handleOpenBox}
            />

            {/* Open Box Image */}
            <img
              src="/RecipientBoxOpen.png"
              alt="Box Open"
              className={`open-box-image ${isBoxOpened ? 'reveal' : ''}`}
              useMap="#image-map"
            />
          </div>

          {/* Image Map Areas */}
          {isBoxOpened && (
            <map name="image-map">
              <area
                alt="Photos"
                title="Photos"
                coords="80,70,150,170"
                shape="rect"
                onMouseEnter={() => handleMouseEnter('Photos')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('Photos')}
              />
              <area
                alt="Gift"
                title="Gift"
                coords="70,185,150,250"
                shape="rect"
                onMouseEnter={() => handleMouseEnter('Gift')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('Gift')}
              />
              <area
                alt="Music"
                title="Music"
                coords="70,265,150,330"
                shape="rect"
                onMouseEnter={() => handleMouseEnter('Music')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('Music')}
              />
              <area
                alt="Videos"
                title="Videos"
                coords="185,70,300,160"
                shape="rect"
                onMouseEnter={() => handleMouseEnter('Videos')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('Videos')}
              />
              <area
                alt="Voice Notes"
                title="Voice Notes"
                coords="185,175,300,200"
                shape="rect"
                onMouseEnter={() => handleMouseEnter('Voice Notes')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('Voice Notes')}
              />
              <area
                alt="Letters"
                title="Letters"
                coords="185,230,300,340"
                shape="rect"
                onMouseEnter={() => handleMouseEnter('Letters')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('Letters')}
              />
            </map>
          )}

          {/* Overlay Items */}
          {['Photos', 'Gift', 'Music', 'Videos', 'Voice Notes', 'Letters'].map((item) => (
            <div
              key={item}
              className={`overlay ${item.toLowerCase().replace(' ', '-')}`}
              style={{ display: hoveredItem === item && isBoxOpened ? 'block' : 'none' }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Get Started Button */}
      <div className="box-preview-button-container">
        <button onClick={handleButtonClick}>Get Started</button>
      </div>

      {/* Preview Items */}
      {selectedItem && (
        <PreviewItems item={selectedItem} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default BoxPreview;
