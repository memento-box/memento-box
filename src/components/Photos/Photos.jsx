

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
        Image Notes
      </Typography>
      <div className="notes-actions">
        <UploadButton uploadFileType={uploadFileType} />
       
      </div>
      <Divider />
      <div className="notes-display">
        {notes.length === 0 ? (
          <Typography sx={{ margin:"auto", marginTop:"10px"}}> Added image notes will display here! </Typography>
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
