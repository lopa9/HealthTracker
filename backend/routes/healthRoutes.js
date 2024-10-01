const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');


router.post('/tracks',healthController.createTrack);
router.get('/tracks', healthController.getAllTracks);
router.get('/tracks/:id', healthController.getTrackById);
router.put('/tracks/:id', healthController.updateTrack);
router.delete('/tracks/:id',healthController.deleteTrack);


module.exports = router;