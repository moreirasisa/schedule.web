import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="static" sx={{ backgroundColor: '#D0AEF2' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
            My Appointments
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;