import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import MementoBoxInfo from '../MementoBoxInfo/MementoBoxInfo';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  return (
    <div className="container">
      <h2>{heading}</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <MementoBoxInfo />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;