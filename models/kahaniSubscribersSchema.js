const mongoose = require('mongoose');

const kahaniSubscribersSchema = new mongoose.Schema({
    "will_remove_it": Number,
    "kahani_id": String,
    "user_id": String
});

const KahaniSubcribers = mongoose.model('kahani-subscribers', kahaniSubscribersSchema);

module.exports = KahaniSubcribers;