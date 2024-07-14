import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";
import UploadButton from "./UploadButton/UploadButton.jsx";
import "./VoiceRecording.css";

export default function VoiceRecording() {
  const [notes, setNotes] = useState([]); // State for notes to be rendered

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
        <UploadButton />
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
