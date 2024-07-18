import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import MementoBoxInfo from '../MementoBoxInfo/MementoBoxInfo';
import Hero from '../Hero/Hero';
import PreviewToggle from '../PreviewToggle/PreviewToggle';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const [selectedBox, setSelectedBox] = useState(null);
  const history = useHistory();
  const url = 'public/videos/memento-Intro.mp4';

  const handleBoxClick = (box) => {
    setSelectedBox(box);
  };

  const closePreview = () => {
    setSelectedBox(null);
  };


  return (
    <div className="container">
      <h2>{heading}</h2>
      <div id="text">
                <h1>Digital gifts, <br /> done differently</h1>
                <h6>Introducing the Memento Box</h6>
                <p>Learn more below</p>
      </div>
      <Hero />
      <div id="video-wrapper">
        <ReactPlayer url={url} controls={true} />
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
        <div className="box" onClick={() => handleBoxClick('box1')}>
          <img src="/boxes/black-w&g-angled.png" alt="Box 1" />
        </div>
        <div className="box" onClick={() => handleBoxClick('box2')}>
          <img src="/boxes/white-blue-ribbon.png" alt="Box 2" />
        </div>
      </div>
      {selectedBox && <PreviewToggle box={selectedBox} closePreview={closePreview} />}
    </div>
  );
}

export default LandingPage;
