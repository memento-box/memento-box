import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
      <div className="notes-actions">
        <button>Upload</button>
        {/* button will pull up small upload form */}
        <button>Record</button>
        {/* button will use recording package and post to Cloudinary */}
      </div>
      <div className="notes-display">
        {notes.length === 0 ? (
          <Typography> Added voice notes will display here! </Typography>
        ) : (
          notes.map((note) => 
            <div>
                {/* add headphone icon */}
                <Typography>{note.fileName}</Typography> {/* title */}
                {/* add play/pause */}
                {/* add visualization here */}
                {/* add length here */}
            </div>)
        )}
      </div>
    </div>
  );
}
