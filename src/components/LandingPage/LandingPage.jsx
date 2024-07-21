import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './LandingPage.css';
import MementoBoxInfo from '../MementoBoxInfo/MementoBoxInfo';
import Hero from '../Hero/Hero';
import PreviewToggle from '../PreviewToggle/PreviewToggle';
import StartYourBox from '../StartYourBox/StartYourBox';
import Occasions from '../Occasions/Occasions'; // Import the Occasions component

function LandingPage() {
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
        <ReactPlayer url="/videos/memento-Intro.mp4" controls={true} />
      </div>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <MementoBoxInfo />
        </div>
      </div>
      <div className="box-preview-heading">
        <h2>Memento Celebrates Any Occasion!</h2>
      </div>
      <Occasions /> 
      <div className="box-preview-heading">
        <h2>Explore Previous Box Creations</h2>
        <p>Click on a box to see the wonderful items inside!</p>
      </div>
      <div className="clickable-boxes">
        <div className="card wedding-card" onClick={() => handleBoxClick('box1', '/boxes/black-w&g-angled.png')}>
          <div className="card-title">To Mr. and Mrs. Smith</div> 
          <img src="/boxes/black-w&g-angled.png" alt="Box 1" />
        </div>
        <div className="card birthday-card" onClick={() => handleBoxClick('box2', '/boxes/white-blue-ribbon.png')}>
          <div className="card-title">Katie's Birthday</div> 
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
