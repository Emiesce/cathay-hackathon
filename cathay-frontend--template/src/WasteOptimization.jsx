import React, { useState } from 'react';
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

import predictionData from '/public/prediction.json';

const flightsData = [
  { flightNumber: 'UO622', destination: 'Tokyo (HND)' },
  { flightNumber: 'UO116', destination: 'Taipei (TPE)' },
  { flightNumber: 'UO631', destination: 'Seoul (ICN)' },
];

const employeesData = [
  { name: 'John Doe', image: 'https://via.placeholder.com/50' },
  { name: 'Jane Smith', image: 'https://via.placeholder.com/50' },
  { name: 'Emily Johnson', image: 'https://via.placeholder.com/50' },
  { name: 'Michael Brown', image: 'https://via.placeholder.com/50' },
  { name: 'Sarah Davis', image: 'https://via.placeholder.com/50' },
  { name: 'Chris Evans', image: 'https://via.placeholder.com/50' },
  { name: 'Jessica Taylor', image: 'https://via.placeholder.com/50' },
  { name: 'David Wilson', image: 'https://via.placeholder.com/50' },
  { name: 'Laura Martinez', image: 'https://via.placeholder.com/50' },
];

const WasteOptimization = () => {
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(0);
  const [estimatedWaste, setEstimatedWaste] = useState({});
  const [resources, setResources] = useState({ employees: [], equipment: [] });

  const handleEstimate = () => {
    const waste = {
      recyclable: predictionData.recyclable[selectedFlightIndex],
      compostable: predictionData.compostable[selectedFlightIndex],
      general: predictionData.trash[selectedFlightIndex],
    };
    setEstimatedWaste(waste);

    const employeesNeeded = predictionData.workforceNeeded[selectedFlightIndex];
    const equipmentNeeded = predictionData.specialEquipmentNeeded[selectedFlightIndex];

    const selectedEmployees = employeesData.sort(() => 0.5 - Math.random()).slice(0, employeesNeeded);
    const selectedEquipment = ['Waste Truck', 'Recycling Bin', 'Compost Bin'].slice(0, equipmentNeeded);

    setResources({ employees: selectedEmployees, equipment: selectedEquipment });
  };


  const today = '2024/11/7'; // Format the current date

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Waste Collection Optimization for {flightsData[selectedFlightIndex].flightNumber} to {flightsData[selectedFlightIndex].destination}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Date: {today}
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Select Flight and Prediction Scenario</InputLabel>
          <Select
            value={selectedFlightIndex}
            onChange={(e) => setSelectedFlightIndex(e.target.value)}
          >
            {flightsData.map((flight, index) => (
              <MenuItem key={flight.flightNumber} value={index}>
                {flight.flightNumber} - {flight.destination}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleEstimate} fullWidth>
          Estimate Waste and Resources
        </Button>
      </Paper>

      {Object.keys(estimatedWaste).length > 0 && (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2, borderRadius: 2 }}>
          <Typography variant="h6">Estimated Waste:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Recyclable: {estimatedWaste.recyclable.toFixed(2)} kg</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Compostable: {estimatedWaste.compostable.toFixed(2)} kg</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>General Waste: {estimatedWaste.general.toFixed(2)} kg</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Resources Needed:
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>Employees Needed:</Typography>
          <Grid container spacing={2}>
            {resources.employees.map((employee, index) => (
              <Grid item xs={4} key={index}>
                <Paper sx={{ padding: 1, textAlign: 'center', borderRadius: 1 }}>
                  <img src={employee.image} alt={employee.name} style={{ borderRadius: '50%' }} />
                  <Typography>{employee.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ marginTop: 2 }}>Equipment Needed:</Typography>
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