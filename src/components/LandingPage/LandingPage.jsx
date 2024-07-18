import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import MementoBoxInfo from '../MementoBoxInfo/MementoBoxInfo';
import Hero from '../Hero/Hero'

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const url = 'public/videos/memento-Intro.mp4';
  // const introVideo = useRef(null);
  // const toVideo = () => {
  //   //  useRef with .focus in the function to target te video componenet? ref needed in video component.
  //     let inputElement = introVideo.current;
  //     inputElement.focus();
  // };

  return (
    <div className="container">
      <h2>{heading}</h2>
      <div id="text">
                <h1>Digital gifts, <br /> done differently</h1>
                <h6>Introducing the Memento Box</h6>
                <a href="#video-wrapper" >Learn more</a>
                {/* <button onClick={() => toVideo()}>Learn more</button> */}
      </div>
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