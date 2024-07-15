import React from 'react';
import './RecipientMixtape.css';

function RecipientMixtape({ onBack }) {
  return (
    <div className="container">
      <button className="back-link" onClick={onBack}>Back</button>
      <h1>Mixtape</h1>
      <p>This portion of the project is outside of the current scope.</p>
      <p>Check back in the future for this feature, where you will be able to create and share personalized mixtapes with friends and family.</p>
    </div>
  );
}

export default RecipientMixtape;
