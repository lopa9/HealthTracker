const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({

    date :{
        type:Date,
        default:Date.now
    },

   steps:{
    type:Number,
    required:true
   },

   caloriesBurned:{
    type:Number,
    required:true
   },

   distanceCovered:{
    type:Number,
    required:true
   },

   weight:{
    type:Number,
    required:true
   }  
    
});

const HealthModel =mongoose.model('HealthData',healthDataSchema);
module.exports =HealthModel;