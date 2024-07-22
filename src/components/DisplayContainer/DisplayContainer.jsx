import React from 'react';
import { Typography } from '@mui/material';
import './DisplayContainer.css';

const DisplayContainer = ({ files }) => {
  if (!files || files.length === 0) {
    return (
      <Typography className='displayContainer'>
        Added images will display here!
      </Typography>
    );
  }

  return (
    <div className='displayContainer'>
      {files.map((file) => (
        <div className='fileDisplay' key={file.id}>
          <img
            src={file.media_url}
            alt={file.public_id || 'Uploaded image'}
            loading='lazy'
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayContainer;