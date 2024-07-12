import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import MementoBoxInfo from '../MementoBoxInfo/MementoBoxInfo';
import Hero from '../Hero/Hero'

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  return (
    <div className="container">
      <h2>{heading}</h2>
      <Hero />

      <div className="grid">
        <div className="grid-col grid-col_8">
          <MementoBoxInfo />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
