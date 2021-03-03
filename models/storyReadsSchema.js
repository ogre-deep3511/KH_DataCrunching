const mongoose = require('mongoose');

const storyReadsSchema = new mongoose.Schema({
    "user_id": String,
    "story_id": String
});

const StoryReads = mongoose.model('story-reads', storyReadsSchema);

module.exports = StoryReads;