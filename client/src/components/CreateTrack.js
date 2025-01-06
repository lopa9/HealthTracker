import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import {  Grid, Typography, TextField, Button, Box, Paper ,InputLabel} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/material';
import axios from 'axios';
    

axios.defaults.baseURL = 'https://healthtracker-6j0z.onrender.com/api';

const CreateTrack = () => {
  const navigate = useNavigate();
  const [track, setTrack] = useState({
    name: '',
    steps: '',
    
    caloriesBurned: '',
    distanceCovered: '',
    weight: '',
  });
  const [showToast, setShowToast] = useState(false);

  const onChange = (e) => {
    setTrack({ ...track, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!track.name || !track.steps || !track.caloriesBurned || !track.distanceCovered || !track.weight) {
      toast.error('Please fill all the fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    axios
      .post('/tracks', track)
      .then((res) => {
        setTrack({
          name: '',
          date: '',
          steps: '',
          caloriesBurned: '',
          distanceCovered: '',
          weight: '',
        });

        // Show the success alert
        toast.success('Track added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });

        // Delay the navigation slightly to allow the toast to be seen
        setTimeout(() => {
          setShowToast(false); // Hide the toast
          navigate('/'); // Navigate to homepage
        }, 5000); // Adjust the timeout as needed
      })
      .catch((err) => {
        console.log('Error in CreateTrack!');
        console.log('The error is -> ', err);
        // Show the error alert
        toast.error('Something went wrong, try again!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 5 }}>
      <ToastContainer />
      <Box sx={{ mb: 4 }}>
        <Link to="/track-list" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="warning" sx={{ mb: 4 }}>
            Show Track List
          </Button>
        </Link>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Add Track
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Track your health journey
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {/* Name of the Track */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name of the Track"
                name="name"
                value={track.name}
                onChange={onChange}
                required
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'black', // Black label color
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'pink', // Pink border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'pink', // Pink border on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'pink', // Pink border when focused
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black', // Black text color
                  },
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'pink',
                    },
                    '&:hover fieldset': {
                      borderColor: 'pink',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'pink',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                }}
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
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'pink',
                    },
                    '&:hover fieldset': {
                      borderColor: 'pink',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'pink',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                }}
              />
            </Grid>

            {/* Calories Burned */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Calories Burned"
                type="number"
                name="caloriesBurned"
                value={track.caloriesBurned}
                onChange={onChange}
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'pink',
                    },
                    '&:hover fieldset': {
                      borderColor: 'pink',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'pink',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                }}
              />
            </Grid>

            {/* Distance Covered */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Distance Covered (km)"
                type="number"
                name="distanceCovered"
                value={track.distanceCovered}
                onChange={onChange}
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'pink',
                    },
                    '&:hover fieldset': {
                      borderColor: 'pink',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'pink',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                }}
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
                sx={{
                  backgroundColor: 'white',
                  '& .MuiInputLabel-root': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'pink',
                    },
                    '&:hover fieldset': {
                      borderColor: 'pink',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'pink',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black',
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="warning" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateTrack;
