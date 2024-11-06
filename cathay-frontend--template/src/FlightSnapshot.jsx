import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
} from '@mui/material';

const FlightSnapshot = ({ flight }) => {
  const getColor = (amount) => {
    if (amount < 20) return '#4caf50'; // Green
    if (amount < 50) return '#ffeb3b'; // Yellow
    return '#f44336'; // Red
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px', minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: '#6200ea' }}>
        Flight Snapshot on {flight.date}
      </Typography>

      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: '#6200ea' }}>
        Waste Levels
      </Typography>

      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        {Object.entries(flight.waste).map(([type, amount]) => (
          <Paper elevation={3} sx={{ p: 3, bgcolor: 'white', borderRadius: '8px', textAlign: 'center', mb: 2, width: '300px' }} key={type}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6200ea' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Waste
            </Typography>
            <LinearProgress
              variant="determinate"
              value={amount}
              sx={{
                backgroundColor: '#e0e0e0',
                height: 20,
                borderRadius: 5,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getColor(amount),
                },
              }}
            />
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
              {amount} kg
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default FlightSnapshot;