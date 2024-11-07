import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const flightsData = [
  { flightNumber: 'XY123', destination: 'New York', date: '2024-10-01' },
  { flightNumber: 'XY456', destination: 'Los Angeles', date: '2024-10-02' },
  { flightNumber: 'XY789', destination: 'Chicago', date: '2024-10-03' }, // Today's flight
];

const employeesData = [
  { name: 'John Doe', image: 'https://via.placeholder.com/50' },
  { name: 'Jane Smith', image: 'https://via.placeholder.com/50' },
  { name: 'Emily Johnson', image: 'https://via.placeholder.com/50' },
  { name: 'Michael Brown', image: 'https://via.placeholder.com/50' },
  { name: 'Sarah Davis', image: 'https://via.placeholder.com/50' },
];

const WasteOptimization = () => {
  const [selectedFlight, setSelectedFlight] = useState(flightsData[2]); // Default to today's flight
  const [estimatedWaste, setEstimatedWaste] = useState({});
  const [resources, setResources] = useState({ employees: [], equipment: [] });

  const handleEstimate = () => {
    const waste = {
      recyclable: Math.floor(Math.random() * 150), // Randomize up to 150 kg
      compostable: Math.floor(Math.random() * 75),
      general: Math.floor(Math.random() * 100),
    };
    setEstimatedWaste(waste);

    const totalWaste = waste.recyclable + waste.compostable + waste.general;
    const employeesNeeded = Math.ceil(totalWaste / 20); // 1 employee per 20 kg of waste
    const equipmentNeeded = Math.ceil(totalWaste / 50); // 1 equipment per 50 kg of waste

    const selectedEmployees = employeesData.sort(() => 0.5 - Math.random()).slice(0, employeesNeeded);
    const selectedEquipment = ['Waste Truck', 'Recycling Bin', 'Compost Bin'].slice(0, equipmentNeeded);

    setResources({ employees: selectedEmployees, equipment: selectedEquipment });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Waste Collection Optimization for Flight {selectedFlight.flightNumber} to {selectedFlight.destination}
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Select Flight</InputLabel>
          <Select
            value={selectedFlight.flightNumber}
            onChange={(e) => {
              const flight = flightsData.find(flight => flight.flightNumber === e.target.value);
              setSelectedFlight(flight);
            }}
          >
            {flightsData.filter(flight => flight.date === '2024-10-03').map((flight) => (
              <MenuItem key={flight.flightNumber} value={flight.flightNumber}>
                {flight.flightNumber} - {flight.destination}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleEstimate}>
          Estimate Waste and Resources
        </Button>
      </Paper>

      {Object.keys(estimatedWaste).length > 0 && (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6">Estimated Waste:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Recyclable: {estimatedWaste.recyclable} kg</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Compostable: {estimatedWaste.compostable} kg</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>General Waste: {estimatedWaste.general} kg</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Resources Needed:
          </Typography>
          <Typography>Employees Needed:</Typography>
          <Grid container spacing={2}>
            {resources.employees.map((employee, index) => (
              <Grid item xs={4} key={index}>
                <Paper sx={{ padding: 1, textAlign: 'center' }}>
                  <img src={employee.image} alt={employee.name} style={{ borderRadius: '50%' }} />
                  <Typography>{employee.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography>Equipment Needed:</Typography>
          <ul>
            {resources.equipment.map((equip, index) => (
              <li key={index}>{equip}</li>
            ))}
          </ul>
        </Paper>
      )}
    </Box>
  );
};

export default WasteOptimization;