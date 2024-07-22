import { Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import PreviewsContainer from '../PreviewsContainer/PreviewsContainer';

const PhotoUploadButton = ({ uploadFileType, resetState }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () =>
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [previews]);

  const handleFilesChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const newPreviews = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreviews(newPreviews);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('fileType', uploadFileType);

    try {
      const response = await axios.post('/api/photoUpload/multer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // You might want to handle the successful upload here with response.message. Check API returns.
      resetState();
    } catch (error) {
      console.error('Upload error:', error);
      // Handling the error upload here with error.message. Check API returns.
      setError(`Failed to upload files. Please try again: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          multiple
          onChange={handleFilesChange}
          accept={uploadFileType}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={files.length === 0}
        >
          Upload Files
        </Button>
      </form>
      {error && <Typography color='error'>{error}</Typography>}
      {previews.length > 0 && <PreviewsContainer previews={previews} />}
    </div>
  );
};

export default PhotoUploadButton;