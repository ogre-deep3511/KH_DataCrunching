const mongoose = require('mongoose');

const storyViewsSchema = new mongoose.Schema({
    "user_id": String,
    "story_id": String
});

const StoryViews = mongoose.model('story-views', storyViewsSchema);

module.exports = StoryViews;