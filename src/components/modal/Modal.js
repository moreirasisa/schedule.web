import React from "react";
import { Dialog, TextField, Button, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const Modal = ({open, handleClose}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Appointment</DialogTitle>
            <DialogContent>
                <TextField label="Name" fullWidth></TextField>
                <TextField label="Start Time" fullWidth></TextField>
                <TextField label="End Time" fullWidth></TextField>
                <TextField label="Address" fullWidth></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal;