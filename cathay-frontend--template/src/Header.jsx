import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff', // White background
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
        borderRadius: '8px', // Rounded corners
        padding: '10px 20px', // Padding for spacing
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="./public/HK_Express_Logo_(2023).svg" alt="Logo" style={{ height: '50px', marginRight: '16px' }} />
        <Typography variant="h5" sx={{ color: '#6a0dad', fontWeight: 'bold' }}>
          Cabin Waste Monitor
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ marginLeft: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/finished-flights/UO622">
                Finished Flights
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/waste-optimization">
                Waste Optimization
            </MenuItem>
            </Menu>
          </>
        ) : (
          <Box>
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{
                marginLeft: 2,
                backgroundColor: '#6a0dad',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#5a0a9c',
                },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/finished-flights/UO622"
              variant="contained"
              sx={{
                marginLeft: 2,
                backgroundColor: '#6a0dad',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#5a0a9c',
                },
              }}
            >
              Finished Flights
            </Button>
            <Button component={Link} to="/waste-optimization" variant="contained" sx={{ marginLeft: 2 }}>
                Waste Optimization
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;