const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    "currency": String,
    "kahani_id": String,
    "story_id": String,
    "product_type": String,
    "user_id": String,
    "transaction_type": String,
    "coins": Number,
    "is_settled": Boolean
})

const Transactions = mongoose.model('transactions', transactionsSchema);

module.exports = Transactions;