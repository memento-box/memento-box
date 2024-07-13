import React, { useState } from 'react';
import UploadWidget from '../UploadWidget/UploadWidget';

function Photos() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (file) => {
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  return (
    <div className='Photos'>
      <h1>Cloudinary Upload Widget</h1>
      <UploadWidget onUpload={handleUpload} />
      <div>
        {uploadedFiles.map((file, index) => (
          <div key={index}>
            <h2>{file.original_filename}</h2>
            <img src={file.secure_url} alt={file.original_filename} width="200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;