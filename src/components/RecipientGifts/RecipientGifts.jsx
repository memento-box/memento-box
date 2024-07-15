import React from 'react';

function RecipientGifts({ onBack }) {
  return (
    <div className="container">
      <button className="back-link" onClick={onBack}>Back</button>
      <h1>Gifts</h1>
      <p>This portion of the project is outside of the current scope.</p>
    </div>
  );
}

export default RecipientGifts;
