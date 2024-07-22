import { Button, Divider, TextField, Typography } from "@mui/material";
import EditingSidebar from "../EditingSidebar/EditingSidebar.jsx";
import "./PreviewSend.css";
import { useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

export default function PreviewSend() {
const history = useHistory();
  const [dateTime, setDateTime] = useState(null);

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
