import { Divider, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import DisplayContainer from '../DisplayContainer/DisplayContainer.jsx';
import EditingSidebar from '../EditingSidebar/EditingSidebar.jsx';
import PhotoUploadButton from '../PhotoUploadButton/PhotoUploadButton.jsx';
import './Photos.css';
import UploadButton from '../UploadButton/UploadButton.jsx';

export default function Photos() {
  const [files, setFiles] = useState([]);
  // const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const uploadFileType = 'image/*';

  useEffect(() => {
    resetState();
  }, []);

  const endpoint = async (payload) => {
    try {
      await axios.post("/api/upload/image", payload);
      resetState(); // Fetching notes after successful upload
    } catch (err) {
      console.log("Error posting voice note:", err);
    }
  };

  const resetState = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/photoUpload/files');
      setFiles(response.data);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to fetch files. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }; // getNotes goes second in this array

  return (
    <div className="box-edit-container">
      {
        isLoading && <CircularProgress />
      }
      <EditingSidebar />
      <Typography variant="h5" sx={{ marginLeft: '30px', marginTop: '80px' }}>
        Upload Files
      </Typography>
      <div className="upload-actions">
        <UploadButton uploadFileType={uploadFileType} reload={resetState} endpoint={endpoint}/>
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
