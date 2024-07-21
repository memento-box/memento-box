// LandingPage.jsx
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './LandingPage.css';
import MementoBoxInfo from '../MementoBoxInfo/MementoBoxInfo';
import Hero from '../Hero/Hero';
import PreviewToggle from '../PreviewToggle/PreviewToggle';
import StartYourBox from '../StartYourBox/StartYourBox';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const [selectedBox, setSelectedBox] = useState(null);
  const [boxImage, setBoxImage] = useState(null); 

  const handleBoxClick = (box, image) => {
    setSelectedBox(box);
    setBoxImage(image); 
  };

  const closePreview = () => {
    setSelectedBox(null);
    setBoxImage(null);
  };

  return (
    <div className="container">
      <Hero />
      <div id="video-wrapper">
        <ReactPlayer url="public/videos/memento-Intro.mp4" controls={true} />
        <ReactPlayer url={url} controls={true} id="video" />
      </div>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <MementoBoxInfo />
        </div>
      </div>
      <div className="box-preview-heading">
        <h3>Explore Previous Box Creations</h3>
        <p>Click on a box to see the wonderful items inside!</p>
      </div>
      <div className="clickable-boxes">
        <div className="box" onClick={() => handleBoxClick('box1', '/boxes/black-w&g-angled.png')}>
          <img src="/boxes/black-w&g-angled.png" alt="Box 1" />
        </div>
        <div className="box" onClick={() => handleBoxClick('box2', '/boxes/white-blue-ribbon.png')}>
          <img src="/boxes/white-blue-ribbon.png" alt="Box 2" />
        </div>
      </div>
      {selectedBox && <PreviewToggle box={selectedBox} boxImage={boxImage} closePreview={closePreview} />}
      <div>
        <StartYourBox />
      </div>
    </div>
  );
}

export default LandingPage;
