const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        return console.log("MongoDB connected");
    } catch (err) {
        return console.log(err);
    }
}

module.exports = connectDB;