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


// Get a room by ID
exports.getTrackById = async (req, res) => {
    try {
        const trackById = await HealthModel.findById(req.params.id); // Find track by ID
        if (!trackById) return res.status(404).send('Track not found in database'); // If track is not found, return 404
        res.send(trackById); // Send the track as a response
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};


// Update a room by ID
exports.updateTrack = async (req, res) => {
    try {
        const updatedTrack = await HealthModel.findByIdAndUpdate(req.params.id, {
           // date:req.body.date,
            steps:req.body.steps,
            caloriesBurned:req.body.caloriesBurned,
            distanceCovered:req.body.distanceCovered,
            weight:req.body.weight
        }, { new: true }); // Return the updated Track

        if (!updatedTrack) return res.status(404).send('Track not found in database'); // If track is not found, return 404
        res.send(updatedTrack); // Send the updated  track as a response
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};
    

// Delete a room by ID
exports.deleteTrack = async (req, res) => {
    try {
        const trackById = await HealthModel.findByIdAndDelete(req.params.id); // Find track by ID and delete it
        if (!trackById) return res.status(404).send('Track not found in database'); // If track is not found, return 404
        res.send("Track deleted successfully"); // Send success message
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};