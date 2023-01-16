const mongoose = require('mongoose'); // import mongoose model


// create schema of our database query's
let MemberSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    City: String
});


// mapping Members Collection to the schema.
module.exports = mongoose.model('members', MemberSchema);