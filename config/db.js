
const mongoose = require("mongoose");

const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(("MongoDB connected successfully!!!"));
        
    } catch (error) {
        console.log("Connection Error");
        
    }
}

module.exports = connectDB;

