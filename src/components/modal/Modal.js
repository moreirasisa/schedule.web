import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

export default function Modal() {
    const [open,setOpen] = useState(false);
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [appointment, setAppointment] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        typeId: '',
        userId: '',
        address: ''
    });
    
    const getAppointmentTypes = async (setAppointmentTypes) => {
        const response = await fetch("http://localhost:5000/api/v1/appointment/types");
        const data = await response.json();
        setAppointmentTypes(data);
    }
    
    const openDialog = () => {
      setOpen(true);
    };

    const closeDialog = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAppointment(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/appointment', appointment);
            console.log('Appointment created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating appointment:', error.response ? error.response.data : error.message);
            throw error;
        }
        closeDialog();
    };

    useEffect(() => {
        getAppointmentTypes(setAppointmentTypes);
    }, []);

    return (
      <div>
        <IconButton color="primary" aria-label="Add appointment" onClick={openDialog}>
            <AddTaskIcon />
        </IconButton>

        <Dialog open={open} fullWidth maxWidth='sm' PaperProps={{ sx: { borderRadius: '10px' } }}>
          <DialogTitle>Add Appointment</DialogTitle>
          <DialogContent>
            <form>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField label="Appointment" variant="outlined" fullWidth name="name" value={appointment.name}
                    onChange={handleChange} />
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField label="Date" variant="outlined" fullWidth name="date" value={appointment.date}
                    onChange={handleChange} />
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField label="Start Time" variant="outlined" fullWidth name="startTime" value={appointment.startTime}
                    onChange={handleChange} />
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <TextField label="End Time" variant="outlined" fullWidth name="endTime" value={appointment.endTime}
                    onChange={handleChange} />
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-select-label"
                      id="demo-select"
                      label="Type"
                      name="type"
                      value={appointment.typeId}
                      onChange={handleChange}
                      fullWidth>
                        {
                            appointmentTypes.map((type) => (
                                <MenuItem value={type.name}>{type.name}</MenuItem>
                            ))
                        }
                    </Select>
                  </FormControl>
                  <TextField label="Address" variant="outlined"  name="address" value={appointment.address}
                    onChange={handleChange} fullWidth />
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color="success" onClick={handleSubmit}>Submit</Button>
            <Button variant='contained' color='error' onClick={closeDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}