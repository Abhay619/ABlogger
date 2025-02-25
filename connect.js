const mongoose = require("mongoose");

async function connectMongoDb(url) {
    mongoose.connect(url).then(() => console.log("Database is connected"));
}

module.exports = {connectMongoDb};