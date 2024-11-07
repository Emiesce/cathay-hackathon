import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CabinWasteMonitor from './CabinWasteMonitoring'; // Adjust the path as necessary
import FinishedFlights from './FlightHistory'; // Create this component for finished flights
import Header from './Header'; // Import the Header component
import WasteOptimization from './WasteOptimization'; // Import the new component

const App = () => {
  // Example flight and destination (replace with actual logic)
  const flight = "XY123";
  const destination = "New York";

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