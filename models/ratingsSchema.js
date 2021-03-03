const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({
    "rating": Number,
    "story_id": String,
    "user_id": String
});

const Ratings = mongoose.model('ratings', ratingsSchema);

module.exports = Ratings;