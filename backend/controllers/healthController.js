const HealthModel = require('../models/healthModel');  // Import Room model

// Create a new Track
exports.createTracks = async (req, res) => {
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
app.get('/tracks',
    async (req, res) =&gt; {
        try {
            const allTracks = await HealthData.find();
            res.json(allTracks);
        } catch (error) {
            console.error('Error fetching tracks:', error);
            res.status(500)
                .json(
                    {
                        error: 'Internal Server Error'
                    });
        }
    });