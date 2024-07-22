import React from 'react';
import './PreviewsContainer.css';

const PreviewsContainer = ({ previews }) => {
  return (
    <div className='previewsContainer'>
      {previews.map((preview, index) => (
        <div key={index} className='previewItem'>
          <img
            className='previewImage'
            src={preview.url}
            alt={preview.name || `Preview ${index + 1}`}
            style={{
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              margin: '5px',
            }}
          />
          <div className='previewOverlay'>{preview.name}</div>
        </div>
      ))}
    </div>
  );
};

export default PreviewsContainer;