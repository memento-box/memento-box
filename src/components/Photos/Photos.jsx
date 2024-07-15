// import React, { useState } from 'react';
// import UploadWidget from '../UploadWidget/UploadWidget';

// function Photos() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleUpload = (file) => {
//     setUploadedFiles((prevFiles) => [...prevFiles, file]);
//   };

//   return (
//     <div className='Photos'>
//       <h1>Cloudinary Upload Widget</h1>
//       <UploadWidget onUpload={handleUpload} />
//       <div>
//         {uploadedFiles.map((file, index) => (
//           <div key={index}>
//             <h2>{file.original_filename}</h2>
//             <img src={file.secure_url} alt={file.original_filename} width="200" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Photos;

import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";
import UploadButton from "../UploadButton/UploadButton.jsx";
// import "./VoiceRecording.css";

export default function Photos() {
  const [notes, setNotes] = useState([]); // State for notes to be rendered

  const uploadFileType = "image/*";

  const fetchNotes = () => {
    // API call to retrieve relevant voice notes
    setNotes([]);
  };

  useEffect(() => {
    // Fetch voice notes on component load
    fetchNotes();
  }, []);

  return (
    <div className="box-edit-container">
      <EditingSidebar />
      <Typography variant="h4" sx={{ marginLeft: "30px", marginTop: "80px" }}>
        Voice Notes
      </Typography>
      <div className="notes-actions">
        <UploadButton uploadFileType={uploadFileType} />
        <button>Record</button>
        {/* button will pull up small upload form */}

        {/* button will use recording package and post to Cloudinary */}
      </div>
      <Divider />
      <div className="notes-display">
        {notes.length === 0 ? (
          <Typography sx={{ margin:"auto", marginTop:"10px"}}> Added voice notes will display here! </Typography>
        ) : (
          notes.map((note) => (
            <div>
              {/* add headphone icon */}
              <Typography>{note.fileName}</Typography> {/* title */}
              {/* add play/pause */}
              {/* add visualization here */}
              {/* add length here */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
