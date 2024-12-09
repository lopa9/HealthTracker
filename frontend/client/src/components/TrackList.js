import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, Grid, CircularProgress, Box } from '@mui/material';

import TrackCard from './TrackCard';

function TrackList() {
  const [track, setTrack] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get(`/api/tracks`)
      .then((res) => {
        setTrack(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.log('Error from TrackList ->', err);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Track List
      </Typography>

      <Button
        component={Link}
        to="/create-track"
        color="primary"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Add New Track
      </Button>

      {loading ? (
        // Show a loading spinner while data is being fetched
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {track.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary">
                No track found!
              </Typography>
            </Grid>
          ) : (
            track.map((track, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TrackCard track={track} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
}

export default TrackList;