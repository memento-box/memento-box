import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";
import UploadButton from "../UploadButton/UploadButton.jsx";
import "./VoiceRecording.css";
import axios from "axios";

export default function VoiceRecording() {
  const [notes, setNotes] = useState([]); // State for notes to be rendered
  const box_id = 1; // NEED TO PULL THIS FROM REDUX, USING 1 FOR TESTING


  const uploadFileType = "audio/*";
  const endpoint = async (payload) => {
    try {
      await axios.post("/api/upload/voice", payload);
      fetchNotes(); // Fetching notes after successful upload
    } catch (err) {
      console.log("Error posting voice note:", err);
    }
  };

  const fetchNotes = async () => {
    try {
      // API call to retrieve relevant voice notes
      const response = await axios.get(`/api/content/voice/${box_id}`);
      setNotes(response.data); // Setting notes in state
    } catch (err) {
      console.error("Error fetching voice notes:", err); // TODO: Display error message
    }
  };

  useEffect(() => {
    // Fetch voice notes on component load
    fetchNotes();
  }, []);

  // Function to determine MIME type based on file extension ('audio/*' doesnt work for the audio tag) EX: audio/mp3
  const getMimeType = (url) => {
    const extension = url.split(".").pop();
    return `audio/${extension}`;
  };

  return (
    <div className="box-edit-container">
      <EditingSidebar />
      <Typography variant="h4" sx={{ marginLeft: "30px", marginTop: "80px" }}>
        Voice Notes
      </Typography>
      <div className="notes-actions">
        <UploadButton
          uploadFileType={uploadFileType}
          reload={fetchNotes}
          endpoint={endpoint}
        />
        <button>Record</button> {/* TODO */}
        {/* button will pull up small upload form */}
        {/* button will use recording package and post to Cloudinary */}
      </div>
      <Divider /> {/* Separates upload methods from rendered notes */}
      <div className="notes-display">
        {notes.length === 0 ? (
          <Typography sx={{ margin: "auto", marginTop: "10px" }}>
            Added voice notes will display here!
          </Typography>
        ) : (
          notes.map((note) => (
            <div key={note.secure_url} className="notes-item-cont">
              <div className="notes-item">
                <div>
                  <Typography>
                    {note.first} {note.last}
                  </Typography>
                  <audio controls className="audio-player"> {/* html audio player */}
                    <source
                      src={note.secure_url}
                      type={getMimeType(note.secure_url)}
                    />
                    Your browser does not support the audio element. {/* audio player unavailable */}
                  </audio>
                </div>
              </div>
              <Divider /> {/* for organization */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
