import React from 'react';
import './RecipientGifts.css';

function RecipientGifts({ onBack }) {
  return (
    <div className="container">
      <button className="back-link" onClick={onBack}>Back</button>
      <h1>Gifts</h1>
      <p>This portion of the project is outside of the current scope.</p>
      <p>Check back in the future for this feature, where you will be able to share physical gifts with your friends and family.</p>
    </div>
  );
}

export default RecipientGifts;
