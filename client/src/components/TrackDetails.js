import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  Divider,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const URL = process.env.REACT_APP_API_URL; // Access environment variable


const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: 8,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const TrackDetails = () => {
  const [track, setTrack] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/api/tracks/${id}`)
      .then((res) => {
        setTrack(res.data);
      })
      .catch((err) => {
        console.error('Error fetching track details:', err);
        setTrack({ error: 'Error fetching track details' });
      });
  }, [id]);

  const onDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`${URL}/api/tracks/${id}`)
      .then(() => {
        navigate('/track-list');
      })
      .catch((err) => {
        console.error('Error deleting track:', err);
      });
    setOpenDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  if (!track) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
  <StyledCard>
    <Grid
      container
      spacing={4}
      sx={{
        padding: 3, // Adds padding inside the grid
      }}
    >
      {/* Track Name and Date Section */}
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Track Name: <span style={{ color: 'teal' }}>{track.name}</span>
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom sx={{ fontSize: 18 }}>
          Date: <span style={{ color: '#FF4081' }}>{track.date}</span>
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Grid>

      {/* Image Section */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          paddingLeft: 2, // Space to the left of the image
        }}
      >
        <StyledCard
          sx={{
            borderRadius: 5,
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={track.imageUrl || 'https://www.sheknows.com/wp-content/uploads/2018/04/these-are-the-best-exercises-to-improve-heart-health.png'}
            alt={track.name}
            sx={{
              objectFit: 'cover',
              borderRadius: 5,
            }}
          />
        </StyledCard>
      </Grid>

      {/* Track Details Section */}
      <Grid item xs={12} md={8}>
        <Box display="flex" flexDirection="column" sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ color: 'pink', fontWeight: 'bold' }}>
            Track Details:
          </Typography>
          <Typography variant="body1">
            <strong>Steps :</strong> {track.steps}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {track.date}
          </Typography>
          <Typography variant="body1">
            <strong>Calories Burned (kcal) :</strong> {track.caloriesBurned}
          </Typography>
          <Typography variant="body1">
            <strong>Distance Covered (km) :</strong> {track.distanceCovered}
          </Typography>
          <Typography variant="body1">
            <strong>Current Weight (kg) :</strong> {track.weight}
          </Typography>
        </Box>
      </Grid>
    </Grid>

    {/* Action Buttons */}
    <Box mt={4} display="flex" justifyContent="flex-end" gap={2} sx={{ paddingBottom: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        component={RouterLink}
        to="/track-list"
        variant="outlined"
        sx={{
          borderRadius: 20,
          color: 'teal',
          borderColor: 'teal',
          '&:hover': { backgroundColor: 'teal', color: 'white' },
        }}
      >
        Back to Track List
      </Button>
      <Box>
        <Button
          startIcon={<EditIcon />}
          component={RouterLink}
          to={`/edit-track/${track._id}`}
          variant="contained"
          color="primary"
          sx={{
            mr: 1,
            borderRadius: 20,
            '&:hover': { backgroundColor: '#2c6e95' },
          }}
        >
          Edit Track
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={onDeleteClick}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 20,
            '&:hover': { backgroundColor: '#d32f2f' },
          }}
        >
         Delete Track
            </Button>
          </Box>
        </Box>
      </StyledCard>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDeleteCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this track? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
</Container>

  );
};

export default TrackDetails;