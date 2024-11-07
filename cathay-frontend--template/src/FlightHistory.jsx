// FinishedFlights.jsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const dummyFlights = [
  {
    flightNumber: 'XY123',
    destination: 'New York',
    date: '2024-10-01',
    status: 'Finished',
    waste: {
      recyclable: 10,
      compostable: 5,
      general: 15,
    },
    accumulationData: [0, 5, 10, 15, 20], // Dummy data for graph
  },
  {
    flightNumber: 'XY123',
    destination: 'New York',
    date: '2024-10-02',
    status: 'Finished',
    waste: {
      recyclable: 8,
      compostable: 4,
      general: 12,
    },
    accumulationData: [0, 6, 10, 14, 18],
  },
  {
    flightNumber: 'XY123',
    destination: 'New York',
    date: '2024-10-03',
    status: 'Finished',
    waste: {
      recyclable: 12,
      compostable: 3,
      general: 20,
    },
    accumulationData: [0, 5, 15, 20, 25],
  },
  {
    flightNumber: 'XY123',
    destination: 'New York',
    date: '2024-10-04',
    status: 'Finished',
    waste: {
      recyclable: 15,
      compostable: 2,
      general: 10,
    },
    accumulationData: [0, 3, 10, 14, 18],
  },
];

const FinishedFlights = () => {
  const { flightNumber } = useParams(); // Get the flight number from the URL

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Finished Flights for {flightNumber}
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {dummyFlights.map((flight, index) => (
            <ListItem key={index} sx={{ marginBottom: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={`Flight Number: ${flight.flightNumber}`}
                secondary={`Destination: ${flight.destination} | Date: ${flight.date} | Status: ${flight.status}`}
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