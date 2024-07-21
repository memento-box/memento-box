import React, { useEffect, useState } from "react";
import EditingSidebar from "../EditingSidebar/EditingSidebar";
import { Button, Divider, TextField, Typography } from "@mui/material";
import "./AdminOverview.css";
import { useHistory } from "react-router-dom";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

export default function AdminOverview() {
    const user = useSelector((state) => state.user.first_name);
  const history = useHistory();
  const dispatch = useDispatch();
  // const boxId = useSelector((state) => state.box.id);
  const boxId = 1;
  const [dateTime, setDateTime] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [voiceCount, setVoiceCount] = useState(0);

  const handleDateChange = (newValue) => {
    setDateTime(newValue);
  };

  const getFormattedDateTime = () => {
    return dateTime ? format(dateTime, "MM/dd/yyyy hh:mm a") : "";
  };
  const getBoxItems = () => {
    dispatch({ type: "FETCH_COUNT", payload: boxId });
  };

  useEffect(() => {
    getBoxItems();
  }, [dispatch, boxId]);

  const count = useSelector((state) => state.content.count);

  useEffect(() => {
    const { photos, videos, letters, voiceNotes } = count;
    // console.log(count);
    // console.log('photo',photo);
    // console.log('video',video);
    // console.log('letter',letter);
    // console.log('voice',voice);
    setPhotoCount(photos || 0);
    setVideoCount(videos || 0);
    setLetterCount(letters || 0);
    setVoiceCount(voiceNotes || 0);
  }, [count]);

  return (
    <div className="box-edit-container">
      <EditingSidebar />
      <div className="admin-overview-grid">
        <Typography variant="h4" className="overview-title">
          Overview
        </Typography>
        <Typography variant="h5" className="overview-subtitle">
          Hi, {user}!
        </Typography>

        <div className="top-left">
          <Typography variant="h6">What's already in this box?</Typography>
          <div>
            <Typography>Photos ({photoCount})</Typography>
            <Typography>Videos ({videoCount})</Typography>
            <Typography>Voice Notes ({voiceCount})</Typography>
            <Typography>Letters ({letterCount})</Typography>
          </div>
        </div>

        <div className="top-right">
          <div className="important-dates">
            {/* <Typography variant="h6">Important Dates</Typography>
            <TextField
              label="Update due date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            /> */}
            {/* <TextField
                            label="Set reminder dates for collaborators"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        />
                        <Button variant="contained" sx={{ marginTop: 2 }}>
                            Add
                        </Button>
                        <TextField
                            label="Set review date for yourself"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        />
                        <Button variant="contained" sx={{ marginTop: 2 }}>
                            Add
                        </Button> */}
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => history.push('/previewSend')}>
              Review and Send
            </Button>
          </div>
        </div>

        <div className="bottom">
          {/* <Typography variant="h6">Collaborators</Typography>
          <div className="collaborators-list">
            <div className="collaborator">
              <Typography>Julie Franklin</Typography>
              <Typography>juliefranklin@gmail.com</Typography>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
