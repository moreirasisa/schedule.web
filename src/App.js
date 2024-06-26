import './App.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Header from './components/Header';
import Appointment from './components/Appointment'

function App() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className='Login-card'>
        <Card sx={{ minWidth: 1000, height: 500 }}>
            <CardContent>
              <TextField
                label="With normal TextField"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '100%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                }}
              />
              <TextField
                label="With normal TextField"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '100%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                }}
              />
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </div>
      {/* <header className="App-header">
        <Header/>
      </header> */}
      {/* <div className='Appointments'>
        <Appointment/>
      </div> */}
    </div>
  );
}

export default App;
