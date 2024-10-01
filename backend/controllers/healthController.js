const HealthModel = require('../models/healthModel');  // Import Room model

// Create a new Track
exports.createTrack = async (req, res) => {
    try {
        let newTrack= new HealthModel({
            date:req.body.date,
            steps:req.body.steps,
            caloriesBurned:req.body.caloriesBurned,
            distanceCovered:req.body.distanceCovered,
            weight:req.body.weight,
    
        });
        newTrack = await newTrack.save(); // Save the new track to the database
        res.send(newTrack); // Send the saved Track as a response
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};


// Get all tracks
exports.getAllTracks = async (req, res) => {
    try {
        const allTracks = await HealthModel.find();
        res.send(allTracks);
    } catch (err) {
        res.status(400).send(err.message);
    }
};


exports.getTrackById = async (req, res) => {
    try {
        const TrackById = await HealthModel.findById(req.params.id);
        if (!trackById) return res.status(404).send('Track not found in database');
        res.send(trackById);
    } catch (err) {
        res.status(400).send(err.message);
    }
};


exports.updateTrack = async (req, res) => {
    try {
        const trackById = await HealthModel.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author }, { new: true });
        if (!trackById) return res.status(404).send('Track not found in database');
        res.send(trackById);
        console.log("Track updated successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

    