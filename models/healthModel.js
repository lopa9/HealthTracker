const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    date: { 
        type: Date, 
        required: true 
    },

    steps: {
        type: Number,
        required: true
    },

    caloriesBurned: {
        type: Number,
        required: true
    },

    distanceCovered: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    }

});

const HealthModel = mongoose.model('HealthData', healthDataSchema);
module.exports = HealthModel;