const express = require('express');
const router = express.Router();
const bookController = require('../controllers/healthController');


router.post('/tracks',healthController.createTrack);
router.get('/tracks', healthController.getAllTracks);


module.exports = router;