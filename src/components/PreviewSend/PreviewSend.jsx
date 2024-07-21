import { Button, Divider, TextField, Typography } from "@mui/material";
import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";
import "./PreviewSend.css";
import { useEffect, useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function PreviewSend() {
const history = useHistory();
  const [dateTime, setDateTime] = useState(null);
  const dispatch = useDispatch();
  const email = useSelector(store => store.email.email);

  // HOW ARE WE TRACKING THE BOX THAT'S BEING BUILT?
  // I.E. WHERE CAN WE PULL THE BOX ID FROM?  SHOULD THIS PAGE BE /previewSend/:id ?
  // The API send will not work without feeding the box id into the GET somehow; the GET is pulling the data needed for the email POST.
  useEffect((boxId) => {
    dispatch({ type: 'FETCH_EMAIL_DETAILS', payload: boxId});
    console.log(boxId);
  })

  const handleDateChange = (newValue) => {
    setDateTime(newValue);
  };

  const getFormattedDateTime = () => {
    return dateTime ? format(dateTime, "MM/dd/yyyy hh:mm a") : "";
  };
  return (
    <div className="box-edit-container">
      <EditingSidebar />
      <Typography variant="h4" sx={{ marginLeft: "30px", marginTop: "80px" }}>
        Preview & Send
      </Typography>
      <div className="preview-send-actions">
        <Button
          variant="contained"
          component="span"
          sx={{ borderRadius: "50px", backgroundColor: "black" }}
          onClick={()=>{history.goBack()}}
        >
          Back
        </Button>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Select Date and Time"
            value={dateTime}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            )}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          component="span"
          sx={{ borderRadius: "50px", backgroundColor: "black" }}
        >
          Schedule to Send
        </Button>
        {/** ADD ONCLICK TO TRIGGER EMAIL **/}
      </div>
      <Divider />
      <div className="preview-display">{/** ADD PREVIEW HERE **/}</div>
    </div>
  );
}
