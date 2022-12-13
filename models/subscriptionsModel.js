const mongoose = require('mongoose'); // import mongoose model

// create schema of our database collection
let subscriptionsSchema = new mongoose.Schema({
    MemberID: mongoose.Types.ObjectId,
    Movies: [{ movieID: mongoose.Types.ObjectId, date: String }]
});



// mapping subscriptions Collection to the schema.
module.exports = mongoose.model('subscriptions', subscriptionsSchema);