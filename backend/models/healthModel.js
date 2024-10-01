const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({

    date :{
        type:Date,
        default:Date.now
    },
   steps:Number,
   caloriesBurned:Number,
   distanceCovered:Number,
   weight:Number,
    
});

const HealthModel =mongoose.model('HealthData',healthDataSchema);
module.exports =HealthModel;