const mongoose = require('mongoose');

const storiesSchema = new mongoose.Schema({
    "title": String,
    "kahani_id": String,
    "no_of_words": Number,
    "cover_image": String,
    "author_id": String,
    "main_content": String,
    "is_active": Number,
    "title_id": String,
    "will_remove_it": Number,
    "views_count": Number
})

const stories = mongoose.model('stories', storiesSchema);

module.exports = stories;