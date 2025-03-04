const mongoose = require("mongoose");

async function connectMongoDb(url) {
    try {
        
        mongoose.connect(url).then(() => console.log("Database is connected"));
    } catch (error) {
        console.log("Database Error");
    }
}

module.exports = {connectMongoDb};