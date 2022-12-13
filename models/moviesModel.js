const mongoose = require('mongoose');// import mongoose model

// create schema of our database collection
let moviesSchema = new mongoose.Schema({
    Name: String,
    Genres: [String],
    Image: String,
    Premiered: Date
});

// mapping movies Collection to the schema.
module.exports = mongoose.model('movies', moviesSchema);