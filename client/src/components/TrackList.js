// src/components/TrackList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Grid, CircularProgress, Box } from '@mui/material';
import TrackCard from './TrackCard';  // Importing the updated TrackCard component
import axios from 'axios';

axios.defaults.baseURL = 'https://healthtracker-6j0z.onrender.com/api';

function TrackList() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        // Use absolute URL for the backend if necessary
        const response = await axios.get('/tracks');  // Correct API URL
        setTracks(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setError(err.response ? err.response.data.message : err.message); // Set error state with the message
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchTracks();
  }, []); // Empty dependency array ensures the request is made once when the component is mounted

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Track List
      </Typography>

      <Button
        component={Link}
        to="/create-track"  // Link to create a new track
        color="primary"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Add Track
      </Button>

      {loading ? (
        // Show a loading spinner while data is being fetched
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        // Display error message if the fetch failed
        <Typography variant="h6" color="error" mt={4}>
          Error fetching tracks: {error}
        </Typography>
      ) : tracks.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" color="text.secondary">
            No tracks found!
          </Typography>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {tracks.map((track) => (
            <Grid item xs={12} sm={6} md={4} key={track._id}>
              <TrackCard track={track} />  {/* Render TrackCard for each track */}
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default TrackList;
