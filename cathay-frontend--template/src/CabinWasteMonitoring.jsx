// CabinWasteMonitor.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const binStyles = {
  bin: {
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    transition: 'background-color 0.3s',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  title: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  fillLevel: {
    fontSize: '0.875rem',
  },
};

const getColor = (capacity) => {
  if (capacity > 75) return '#d9534f'; // Red
  if (capacity > 50) return '#f0ad4e'; // Yellow
  return '#5cb85c'; // Green
};

const CabinWasteMonitor = () => {
  const initialDurationInSeconds = 2 * 60 * 60; // 2 hours
  const [bins, setBins] = useState([
    { type: 'Recyclable', weight: 10, capacity: 30 },
    { type: 'Compostable', weight: 5, capacity: 20 },
    { type: 'General Waste', weight: 15, capacity: 40 },
  ]);

  const [graphData, setGraphData] = useState({
    labels: Array.from({ length: 12 }, (_, i) => `T+${(i + 1) * 10} min`),
    datasets: [
      {
        label: 'Trash Collected (kg)',
        data: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * (20 + i * 2)) + 5),
        borderColor: '#6a0dad',
        backgroundColor: 'rgba(106, 13, 173, 0.2)',
        fill: true,
      },
    ],
  });

  const [flightInfo, setFlightInfo] = useState({
    destination: 'New York',
    flightNumber: 'XY123',
    duration: initialDurationInSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setFlightInfo((prev) => {
        const newDuration = prev.duration - 1;
        return { ...prev, duration: newDuration };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return duration > 60 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  };

  const estimatedArrival = () => {
    const arrivalTime = new Date(Date.now() + flightInfo.duration * 1000);
    return arrivalTime.toLocaleTimeString();
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#6a0dad' }}>
        Cabin Waste Monitoring
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#6a0dad', fontWeight: 'bold' }}>
          Flight Information
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Destination: {flightInfo.destination}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Flight Number: {flightInfo.flightNumber}
        </Typography>
        <Typography variant="body1">
          Duration: {formatDuration(flightInfo.duration)}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Estimated Arrival: {estimatedArrival()}
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        {bins.map((bin, index) => {
          const fillPercentage = (bin.weight / bin.capacity) * 100;
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  ...binStyles.bin,
                  backgroundColor: getColor(fillPercentage),
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={fillPercentage}
                  sx={{
                    width: '100%',
                    height: '12px', // Increased height for bolder appearance
                    borderRadius: '5px',
                    position: 'absolute',
                    paddingTop: '10px',
                    bottom: '5px',
                    left: '0',
                    ...(fillPercentage > 75 && { animation: 'flash 1s infinite' }),
                  }}
                />
                <Typography variant="h6" sx={binStyles.title}>
                  {bin.type}
                </Typography>
                <Typography variant="body1" sx={binStyles.fillLevel}>
                  Weight: {bin.weight} kg
                </Typography>
                <Typography variant="body1" sx={binStyles.fillLevel}>
                  Capacity: {bin.capacity} kg
                </Typography>
                <Typography variant="body2" sx={binStyles.fillLevel}>
                  Fill Level: {fillPercentage.toFixed(2)}%
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#6a0dad', fontWeight: 'bold' }}>
          Additional Metrics
        </Typography>
        <Typography variant="body1">
          Total Waste Collected: {bins.reduce((sum, bin) => sum + bin.weight, 0)} kg
        </Typography>
        <Typography variant="body1">
          Average Fill Level: {(
            (bins.reduce((sum, bin) => sum + (bin.weight / bin.capacity) * 100, 0) / bins.length)
          ).toFixed(2)}%
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#6a0dad', fontWeight: 'bold' }}>
          Trash Collection Over Time
        </Typography>
        <Box sx={{ height: '300px' }}> {/* Make the graph smaller */}
          <Line data={graphData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default CabinWasteMonitor;