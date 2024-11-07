import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CabinWasteMonitor from './CabinWasteMonitoring'; // Adjust the path as necessary
import FinishedFlights from './FlightHistory'; // Create this component for finished flights
import Header from './Header'; // Import the Header component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CabinWasteMonitor />} />
        <Route path="/finished-flights/:flightNumber" element={<FinishedFlights />} /> {/* Route with parameter */}
      </Routes>
    </Router>
  );
};


export default App;