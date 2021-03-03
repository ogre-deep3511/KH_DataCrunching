const mongoose = require('mongoose');

const kahaniesSchema = new mongoose.Schema({
    "author_id": String,
    "type": String,
    "title": String,
    "title_id": String,
    "tag_line": String,
    "cover_image": String,
    "keywords": String,
    "genre": String,
    "language": String,
    "copy_rights": String,
    "dedicated_to_summary": String,
    "writing_style": String,
    "editor_pick": Boolean,
    "is_active": Number,
    "will_remove_it": Number,
    "views_count": Number
});

const Kahanies = mongoose.model('kahanies', kahaniesSchema)

module.exports = Kahanies;