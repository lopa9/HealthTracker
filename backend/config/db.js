const mongoose = require ("mongoose");

const connectDB = async() => {

    try{

        await mongoose.connect('mongodb+srv://HealthTracker_admin:HealthTracker_admin@healthtracker.atzc9.mongodb.net/Health-db?retryWrites=true&w=majority&appName=HealthTracker');
        console.log("connected to mongoDB");
    } catch(err){
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);

    }
};
module.exports = connectDB;