import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h2" component="h1" color="primary" gutterBottom>
        Welcome to the Health Tracking System
      </Typography>
      <Typography variant="h5" gutterBottom>
      Your Health, Our Priority.
      </Typography>
      <Box mt={4}>
      <Button 
          component={Link} 
          to="/track-list" 
          color="primary" 
          variant="contained"
        >
          View Tracks
        </Button>

        <Button component={Link} to="/export" color="primary" 
          variant="contained" >
          Download track-list
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;