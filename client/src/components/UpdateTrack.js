import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import {  Grid, Typography, TextField, Button, Box, Paper ,InputLabel} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/material';
import axios from 'axios';

function UpdateTrack(props) {
  const [track, setTrack] = useState({
      name: '',
      date: '',
      steps: '',
      caloriesBurned: '',
      distanceCovered: '',
      weight: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://healthtracker-6j0z.onrender.com/api/tracks/${id}`)
      .then((res) => {
        setTrack({
             
                name: res.data.name, 
                date: res.data.date, 
                steps: res.data.steps, 
                caloriesburned: res.data.caloriesBurned, // Assuming caloriesburned are available in res.data
                distancecovered: res.data.distanceCovered, // Assuming distancecovered are available in res.data
                weight: res.data.weight, 
                
              
        });
      })
      .catch((err) => {
        console.log('Error from UpdateTrackInfo GET request');
        console.log(err)
      });
  }, [id]);

  const onChange = (e) => {
    setTrack({ ...track, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: track.name,
      date: track.date,
      steps: track.steps,
      caloriesburned: track.caloriesBurned,
      distancecovered: track.distanceCovered,
      weight: track.weight,
    };

    axios
      .put(`https://healthtracker-6j0z.onrender.com/api/tracks/${id}`, data)
      .then((res) => {
        navigate(`/show-track/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateTrackInfo PUT request ->');
        console.log(err)
      });
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 5 }}>
      <ToastContainer />
      <Box sx={{ mb: 4 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="warning" sx={{ mb: 4 }}>
            Show Track List
          </Button>
        </Link>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Edit Track
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Update Track's Information
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name of the Track"
                name="name"
                value={track.name}
                onChange={onChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={track.date}
                onChange={onChange}
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>

            {/* Steps */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Steps"
                type="number"
                name="steps"
                value={track.steps}
                onChange={onChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Calories Burned */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Calories Burned"
                type="number"
                name="caloriesburned"
                value={track.caloriesBurned}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>

            {/* Distance Covered */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Distance Covered (km)"
                type="number"
                name="distancecovered"
                value={track.distanceCovered}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>

            {/* Weight */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                name="weight"
                value={track.weight}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="warning" fullWidth>
              Update Track
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateTrack;