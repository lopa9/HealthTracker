const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

// Routes for health tracking data
router.post('/tracks', healthController.createTrack); // Post route to create track
router.get('/tracks', healthController.getAllTracks); // Get route to fetch all tracks
router.get('/tracks/:id', healthController.getTrackById); // Get route to fetch a single track by ID
router.put('/tracks/:id', healthController.updateTrack); // Put route to update a track
router.delete('/tracks/:id', healthController.deleteTrack); // Delete route to delete a track

module.exports = router;
