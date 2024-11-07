import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const flightsData = {
    UO622: {
      destination: 'Tokyo (HND)',
      flights: [
        { date: '2024-10-01', status: 'Finished', waste: { recyclable: 20, compostable: 10, general: 30 }, accumulationData: [0, 15, 30, 45, 60, 75, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360] },
        { date: '2024-10-02', status: 'Finished', waste: { recyclable: 20, compostable: 10, general: 30 }, accumulationData: [0, 15, 30, 45, 60, 75, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360] },
        { date: '2024-10-03', status: 'Finished', waste: { recyclable: 22, compostable: 12, general: 32 }, accumulationData: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240] },
        { date: '2024-10-04', status: 'Finished', waste: { recyclable: 21, compostable: 11, general: 31 }, accumulationData: [0, 14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182, 196, 210] },
        { date: '2024-10-05', status: 'Finished', waste: { recyclable: 23, compostable: 13, general: 33 }, accumulationData: [0, 17, 34, 51, 68, 85, 102, 119, 136, 153, 170, 187, 204, 221, 238, 255] },
        { date: '2024-10-06', status: 'Finished', waste: { recyclable: 19, compostable: 9, general: 29 }, accumulationData: [0, 13, 26, 39, 52, 65, 78, 91, 104, 117, 130, 143, 156, 169, 182, 195] },
        { date: '2024-10-07', status: 'Finished', waste: { recyclable: 25, compostable: 15, general: 35 }, accumulationData: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300] },
        { date: '2024-10-08', status: 'Finished', waste: { recyclable: 27, compostable: 17, general: 37 }, accumulationData: [0, 22, 44, 66, 88, 110, 132, 154, 176, 198, 220, 242, 264, 286, 308, 330] },
        { date: '2024-10-09', status: 'Finished', waste: { recyclable: 24, compostable: 14, general: 34 }, accumulationData: [0, 19, 38, 57, 76, 95, 114, 133, 152, 171, 190, 209, 228, 247, 266, 285] },
        { date: '2024-10-10', status: 'Finished', waste: { recyclable: 28, compostable: 18, general: 38 }, accumulationData: [0, 23, 46, 69, 92, 115, 138, 161, 184, 207, 230, 253, 276, 299, 322, 345] },
      ],
    },
    UO116: {
      destination: 'Taipei (TPE)',
      flights: [
        { date: '2024-10-03', status: 'Finished', waste: { recyclable: 25, compostable: 15, general: 35 }, accumulationData: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300] },
        { date: '2024-10-04', status: 'Finished', waste: { recyclable: 22, compostable: 12, general: 32 }, accumulationData: [0, 18, 36, 54, 72, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290] },
        { date: '2024-10-05', status: 'Finished', waste: { recyclable: 20, compostable: 10, general: 30 }, accumulationData: [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225] },
        { date: '2024-10-06', status: 'Finished', waste: { recyclable: 23, compostable: 13, general: 33 }, accumulationData: [0, 21, 42, 63, 84, 105, 126, 147, 168, 189, 210, 231, 252, 273, 294, 315] },
        { date: '2024-10-07', status: 'Finished', waste: { recyclable: 24, compostable: 14, general: 34 }, accumulationData: [0, 19, 38, 57, 76, 95, 114, 133, 152, 171, 190, 209, 228, 247, 266, 285] },
        { date: '2024-10-08', status: 'Finished', waste: { recyclable: 26, compostable: 16, general: 36 }, accumulationData: [0, 23, 46, 69, 92, 115, 138, 161, 184, 207, 230, 253, 276, 299, 322, 345] },
        { date: '2024-10-09', status: 'Finished', waste: { recyclable: 29, compostable: 19, general: 39 }, accumulationData: [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336, 360] },
        { date: '2024-10-10', status: 'Finished', waste: { recyclable: 30, compostable: 20, general: 40 }, accumulationData: [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375] },
        { date: '2024-10-11', status: 'Finished', waste: { recyclable: 31, compostable: 21, general: 41 }, accumulationData: [0, 26, 52, 78, 104, 130, 156, 182, 208, 234, 260, 286, 312, 338, 364, 390] },
      ],
    },
    UO631: {
      destination: 'Seoul (ICN)',
      flights: [
        { date: '2024-10-05', status: 'Finished', waste: { recyclable: 15, compostable: 10, general: 25 }, accumulationData: [0, 10, 20, 30, 40, 55, 70, 85, 100, 120, 140, 160, 180, 200, 220, 240] },
        { date: '2024-10-06', status: 'Finished', waste: { recyclable: 14, compostable: 9, general: 24 }, accumulationData: [0, 8, 16, 24, 32, 40, 52, 64, 76, 88, 100, 112, 124, 136, 148, 160] },
        { date: '2024-10-07', status: 'Finished', waste: { recyclable: 18, compostable: 12, general: 28 }, accumulationData: [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180] },
        { date: '2024-10-08', status: 'Finished', waste: { recyclable: 16, compostable: 11, general: 26 }, accumulationData: [0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132, 143, 154, 165] },
        { date: '2024-10-09', status: 'Finished', waste: { recyclable: 17, compostable: 10, general: 27 }, accumulationData: [0, 13, 26, 39, 52, 65, 78, 91, 104, 117, 130, 143, 156, 169, 182, 195] },
        { date: '2024-10-10', status: 'Finished', waste: { recyclable: 19, compostable: 14, general: 29 }, accumulationData: [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225] },
        { date: '2024-10-11', status: 'Finished', waste: { recyclable: 21, compostable: 15, general: 31 }, accumulationData: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300] },
        { date: '2024-10-12', status: 'Finished', waste: { recyclable: 22, compostable: 16, general: 32 }, accumulationData: [0, 21, 42, 63, 84, 105, 126, 147, 168, 189, 210, 231, 252, 273, 294, 315] },
        { date: '2024-10-13', status: 'Finished', waste: { recyclable: 20, compostable: 14, general: 30 }, accumulationData: [0, 19, 38, 57, 76, 95, 114, 133, 152, 171, 190, 209, 228, 247, 266, 285] },
      ],
    },
  };

const FinishedFlights = () => {
  const { flightNumber } = useParams(); // Get the flight number from the URL
  const [selectedFlightNumber, setSelectedFlightNumber] = useState(flightNumber || 'XY123');
  const selectedFlightData = flightsData[selectedFlightNumber];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{marginY: 2}}>
        Finished Flights for {selectedFlightNumber}
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <InputLabel sx = {{marginBottom: 1}}>Select Flight Number</InputLabel>
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
                    labels: ['0min', '30min', '1hr', '1.5hr', '2hr', '2.5hr', '3hr', '3.5hr', '4hr', '4.5hr'],
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
                          stepSize: 10,
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