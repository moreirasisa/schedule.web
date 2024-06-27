import './App.css';
import * as React from 'react';
import Header from './components/header/Header';
import { Calendar } from './components/calendar/Calendar'
import { MOCKAPPOINTMENTS } from './components/calendar/const';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Header/>
      </header> */}
      <div className='Calendar'>
        <Calendar startingDate={new Date()} appointmentsObj={MOCKAPPOINTMENTS} />
      </div>
    </div>
  );
}

export default App;
