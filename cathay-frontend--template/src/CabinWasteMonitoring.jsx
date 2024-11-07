import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
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
    marginBottom: '16px', // Increased margin between progress bars
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
    { type: 'Compostable', weight: 18, capacity: 20 },
    { type: 'General Waste', weight: 35, capacity: 40 },
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

  // Ensure graph data always increases
  useEffect(() => {
    setGraphData((prevData) => {
      const newData = [...prevData.datasets[0].data];
      for (let i = 1; i < newData.length; i++) {
        newData[i] = Math.max(newData[i - 1] + Math.floor(Math.random() * 5) + 1, newData[i]);
      }
      return { ...prevData, datasets: [{ ...prevData.datasets[0], data: newData }] };
    });
  }, []);

  const [flightInfo, setFlightInfo] = useState({
    destination: 'New York',
    flightNumber: 'XY123',
    duration: initialDurationInSeconds,
    date: new Date().toLocaleDateString(),
  });

  const navigate = useNavigate();

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

  const handleFlightNumberClick = () => {
    navigate(`/finished-flights/${flightInfo.flightNumber}`); // Pass the flight number in the URL
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
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold', cursor: 'pointer', color: '#6a0dad' }}
          onClick={handleFlightNumberClick}
        >
          Flight Number: {flightInfo.flightNumber}
        </Typography>
        <Typography variant="body1">
          Duration: {formatDuration(flightInfo.duration)}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Date: {flightInfo.date}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Estimated Arrival: {estimatedArrival()}
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        {bins.map((bin, index) => {
          const fillPercentage = (bin.weight / bin.capacity) * 100;
          const isFlashing = fillPercentage > 75; // Determine if the bin should flash
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  ...binStyles.bin,
                  backgroundColor: getColor(fillPercentage),
                  animation: isFlashing ? 'flashing 1s infinite' : 'none', // Flash effect when red
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={fillPercentage}
                  sx={{
                    width: '100%',
                    borderRadius: '5px',
                    position: 'absolute',
                    marginTop: '10px',
                    bottom: '10px',
                    left: '0',
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
        <Box sx={{ height: '250px' }}>
          <Line data={graphData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
      </Paper>
      <style>
        {`
          @keyframes flashing {
            0% { background-color: #d9534f; }
            50% { background-color: #f0ad4e; }
            100% { background-color: #d9534f; }
          }
        `}
      </style>
    </Box>
  );
};

export default CabinWasteMonitor;