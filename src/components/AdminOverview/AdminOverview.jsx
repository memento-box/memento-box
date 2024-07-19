import React, { useState } from "react";
import EditingSidebar from "../EditingSidebar/EditingSidebar";
import { Button, Divider, TextField, Typography } from "@mui/material";
import "./AdminOverview.css";
import { useHistory } from "react-router-dom";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

export default function AdminOverview() {
    const history = useHistory();
    const [dateTime, setDateTime] = useState(null);

    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };

    const getFormattedDateTime = () => {
        return dateTime ? format(dateTime, 'MM/dd/yyyy hh:mm a') : '';
    };

    return (
        <div className="box-edit-container">
            <EditingSidebar />
            <div className="admin-overview-grid">
                <Typography variant="h4" className="overview-title">
                    Overview
                </Typography>
                <Typography variant="h5" className="overview-subtitle">
                    Hi, Stephanie!
                </Typography>

                <div className="top-left">
                    <Typography variant="h6">
                        What's already in this box?
                    </Typography>
                    <div>
                        <Typography>Photos (4)</Typography>
                        <Typography>Videos (3)</Typography>
                        <Typography>Voice Notes (2)</Typography>
                        <Typography>Letters (5)</Typography>
                    </div>
                </div>

                <div className="top-right">
                    <div className="important-dates">
                        <Typography variant="h6">Important Dates</Typography>
                        <TextField
                            label="Update due date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
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
                        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                            Review and Send
                        </Button>
                    </div>
                </div>

                <div className="bottom">
                    <Typography variant="h6">Collaborators</Typography>
                    <div className="collaborators-list">
                        <div className="collaborator">
                            <Typography>Julie Franklin</Typography>
                            <Typography>juliefranklin@gmail.com</Typography>
                        </div>
                        <div className="collaborator">
                            <Typography>Sarah Ipiks</Typography>
                            <Typography>sarahipiks@gmail.com</Typography>
                        </div>
                        <div className="collaborator">
                            <Typography>Frank Ocean</Typography>
                            <Typography>frankocean@gmail.com</Typography>
                        </div>
                        <div className="collaborator">
                            <Typography>John Kittne</Typography>
                            <Typography>johnkittne@gmail.com</Typography>
                        </div>
                        <div className="collaborator">
                            <Typography>Steve Chaney</Typography>
                            <Typography>stevechaney@gmail.com</Typography>
                        </div>
                        <div className="collaborator">
                            <Typography>Linda Marx</Typography>
                            <Typography>lindamarx@gmail.com</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
