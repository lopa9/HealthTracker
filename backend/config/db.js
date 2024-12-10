const mongoose = require ('mongoose');

const connectDB = async() => {

    try{

        await mongoose.connect(process.env.DATABASE);
        console.log("connected to mongoDB");
    } catch(arr){
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);

    }
};
module.exports =connectDB;