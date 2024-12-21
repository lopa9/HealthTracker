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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const TrackDetails = () => {
  const [track, setTrack] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/tracks/${id}`)
      .then((res) => {
        setTrack(res.data);
      })
      .catch((err) => {
        console.log('Error from TrackDetails');
      });
  }, [id]);

  const onDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`/api/tracks/${id}`)
      .then((res) => {
        navigate('/track-list');
      })
      .catch((err) => {
        console.log('Error from TrackDetails_deleteClick');
      });
    setOpenDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                alt={track.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {track.date}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
               {track.steps}
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            {/* Display book details one after another */}
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" paragraph>
                {track.caloriesburned}
              </Typography>
              <Typography variant="body1">Name: {track.name}</Typography>
              <Typography variant="body1">Date: {track.date}</Typography>
              <Typography variant="body1">Steps: {track.steps}</Typography>
            </Box>

          </Grid>
        </Grid>
        
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            startIcon={<ArrowBackIcon />}
            component={RouterLink}
            to="/track-list"
            variant="outlined"
          >
            Back to Track List
          </Button>
          <Box>
            <Button
              startIcon={<EditIcon />}
              component={RouterLink}
              to={`/edit-book/${track._id}`}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Edit Track
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={onDeleteClick}
              variant="contained"
              color="error"
            >
              Delete Track
            </Button>
          </Box>
        </Box>
      </StyledPaper>

      {/* Keep the dialog unchanged */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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