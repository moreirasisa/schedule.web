import './App.css';
import * as React from 'react';
import { Calendar } from './components/calendar/Calendar'
import { useEffect, useState } from 'react';

const getAppointments = async (setAppointments) => {
  const response = await fetch("http://localhost:5000/api/v1/appointment");
  const data = await response.json()
  setAppointments(data);
  console.log("Appointments:", data)
}

function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments(setAppointments);
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <Header/>
      </header> */}
      <div className='Calendar'>
        <Calendar startingDate={new Date()} appointmentsObj={appointments} />
      </div>
    </div>
  );
}

export default App;
