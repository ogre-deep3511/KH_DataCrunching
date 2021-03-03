const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    "isPayment": Boolean,
    "paymentAmount": Number,
    "isPrivate": Boolean,
    "hasJudges": Boolean,
    "entriesCount": Number,
    "subscribersCount": Number,
    "title": String,
    "description": String,
    "language": String,
    "title_id": String,
    "cover_image": String,
    "typeOfEntryAccepted": String,
    "author_id": String
})

const contest = mongoose.model('contest', contestSchema);

module.exports = contest;