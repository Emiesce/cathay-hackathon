import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const flightsData = {
  XY123: {
    destination: 'New York',
    flights: [
      {
        date: '2024-10-01',
        status: 'Finished',
        waste: { recyclable: 10, compostable: 5, general: 15 },
        accumulationData: [0, 5, 10, 15, 20],
      },
      {
        date: '2024-10-02',
        status: 'Finished',
        waste: { recyclable: 8, compostable: 4, general: 12 },
        accumulationData: [0, 6, 10, 14, 18],
      },
    ],
  },
  XY456: {
    destination: 'Los Angeles',
    flights: [
      {
        date: '2024-10-03',
        status: 'Finished',
        waste: { recyclable: 12, compostable: 3, general: 20 },
        accumulationData: [0, 5, 15, 20, 25],
      },
      {
        date: '2024-10-04',
        status: 'Finished',
        waste: { recyclable: 15, compostable: 2, general: 10 },
        accumulationData: [0, 3, 10, 14, 18],
      },
    ],
  },
  XY789: {
    destination: 'Chicago',
    flights: [
      {
        date: '2024-10-05',
        status: 'Finished',
        waste: { recyclable: 5, compostable: 7, general: 9 },
        accumulationData: [0, 2, 8, 12, 20],
      },
      {
        date: '2024-10-06',
        status: 'Finished',
        waste: { recyclable: 4, compostable: 6, general: 8 },
        accumulationData: [0, 1, 5, 11, 15],
      },
    ],
  },
};

const FinishedFlights = () => {
  const { flightNumber } = useParams(); // Get the flight number from the URL
  const [selectedFlightNumber, setSelectedFlightNumber] = useState(flightNumber || 'XY123');
  const selectedFlightData = flightsData[selectedFlightNumber];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Finished Flights for {selectedFlightNumber}
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <InputLabel sx={{ marginBottom: 1}}>Select Flight Number</InputLabel>
        <FormControl fullWidth>
          <Select
            value={selectedFlightNumber}
            onChange={(e) => setSelectedFlightNumber(e.target.value)}
          >
            {Object.keys(flightsData).map((flightNum) => (
              <MenuItem key={flightNum} value={flightNum}>
                {flightNum} - {flightsData[flightNum].destination}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {selectedFlightData.flights.map((flight, index) => (
            <ListItem key={index} sx={{ marginBottom: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={`Flight Number: ${selectedFlightNumber}`}
                secondary={`Destination: ${selectedFlightData.destination} | Date: ${flight.date} | Status: ${flight.status}`}
              />
              <Box sx={{ marginTop: 1, width: '100%' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Waste Summary:</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body2">Recyclable: {flight.waste.recyclable} kg</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">Compostable: {flight.waste.compostable} kg</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">General Waste: {flight.waste.general} kg</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ height: '150px', width: '100%', marginTop: 2 }}>
                <Line
                  data={{
                    labels: ['Start', '10min', '20min', '30min', 'Finish'],
                    datasets: [
                      {
                        label: 'Trash Accumulation (kg)',
                        data: flight.accumulationData,
                        borderColor: '#6a0dad',
                        backgroundColor: 'rgba(106, 13, 173, 0.2)',
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 5,
                        },
                      },
                    },
                  }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default FinishedFlights;