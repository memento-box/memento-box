import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";
import UploadButton from "../UploadButton/UploadButton.jsx";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import "./VoiceRecording.css";

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

  const getSignedUrl = async () => {
    const response = await axios.get('/api/upload/signed-url');
    return response.data;
  };

  const addAudioElement = async (blob) => {
    // Convert blob to file
    const file = new File([blob], "recording.webm", { type: "audio/webm" });

    const { api_key, cloud_name, signature, timestamp, upload_preset } = await getSignedUrl();

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', timestamp);
    formData.append('api_key', api_key);
    formData.append('signature', signature);
    formData.append('upload_preset', upload_preset);

    try {
      // Upload the file directly to Cloudinary
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      const fileUrl = uploadRes.data.secure_url;
      console.log('File uploaded successfully:', fileUrl);

      const payload = {
        box_id,
        secure_url: fileUrl,
      };

      await endpoint(payload);
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

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
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={false}
          downloadFileExtension="webm"
        />
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
