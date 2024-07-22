
import { Divider, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import DisplayContainer from '../DisplayContainer/DisplayContainer.jsx';
import EditingSidebar from '../EditingSidebar/EditingSidebar.jsx';
import PhotoUploadButton from '../PhotoUploadButton/PhotoUploadButton.jsx';
import './Photos.css';

export default function Photos() {
  const [files, setFiles] = useState([]);
  // const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const uploadFileType = 'image/*';

  // const getNotes = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/notes');
  //     setNotes(response.data);
  //   } catch (err) {
  //     console.error("Error fetching notes:", err);
  //     setError("Failed to fetch notes. Please try again later.");
  //   }
  // }, []);

  const getFiles = useCallback(async () => {
    try {
      const response = await axios.get('/api/photoUpload/files');
      setFiles(response.data);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to fetch files. Please try again later.');
    }
  }, []);

  const resetState = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([getFiles()]); // getNotes() goes second in this array
    } catch (err) {
      console.error('Error resetting state:', err);
      setError('Failed to reset state. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [getFiles]); // getNotes goes second in this array

  useEffect(() => {
    resetState();
  }, [resetState]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>;
  }


  return (
    <div className='box-edit-container'>
      <EditingSidebar />
      <Typography variant='h5' sx={{ marginLeft: '30px', marginTop: '80px' }}>
        Upload Files
      </Typography>
      <div className='upload-actions'>
        <PhotoUploadButton uploadFileType={uploadFileType} resetState={resetState} />
      </div>
      <Divider />
      <div
        style={{ minHeight: '55vh', display: 'flex', flexDirection: 'column' }}
      >
        {files.length > 0 ? (
          <DisplayContainer files={files} />
        ) : (
          <Typography sx={{ margin: 'auto' }}>Images will go here.</Typography>
        )}
      </div>
      <Divider />
      {/* Notes code goes here. See below. */}
    </div>
  );
}


// Notes code that goes above if needed
// {notes.length > 0 && (
//   <div>
//     <Typography variant="h6" sx={{ marginLeft: "30px", marginTop: "20px" }}>
//       Notes
//     </Typography>
//     {notes.map((note) => (
//       <div key={note.id}>
//         <Typography>{note.fileName}</Typography>

//       </div>
//     ))}
//   </div>
// )}

