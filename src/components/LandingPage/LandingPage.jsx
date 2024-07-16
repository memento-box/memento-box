import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import MementoBoxInfo from '../MementoBoxInfo/MementoBoxInfo';
import Hero from '../Hero/Hero'

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const url = 'public/videos/memento-Intro.mp4'
  return (
    <div className="container">
      <h2>{heading}</h2>
      <Hero />
      <div id="video-wrapper">
                <ReactPlayer url={url} controls={true}/>
      </div>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <MementoBoxInfo />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
