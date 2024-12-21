const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    steps: {
        type: String,
        required: true
    },

    caloriesBurned: {
        type: String,
        required: true
    },

    distanceCovered: {
        type: String,
        required: true
    },

    weight: {
        type: String,
        required: true
    }

});

const HealthModel = mongoose.model('HealthData', healthDataSchema);
module.exports = HealthModel;