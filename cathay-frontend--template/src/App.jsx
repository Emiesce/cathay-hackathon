import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CabinWasteMonitor from './CabinWasteMonitoring';
import FinishedFlights from './FlightHistory';
import Header from './Header';
import WasteOptimization from './WasteOptimization';

const App = () => {
  const flight = "UO622";
  const destination = "Tokyo (HND)";

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CabinWasteMonitor />} />
        <Route path="/finished-flights/:flightNumber" element={<FinishedFlights />} />
        <Route path="/waste-optimization" element={<WasteOptimization flight={flight} destination={destination} />} />
      </Routes>
    </Router>
  );
};

export default App;