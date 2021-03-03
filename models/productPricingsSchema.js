const mongoose = require('mongoose');

const productPricingsSchema = new mongoose.Schema({
    "coins": Number,
    "type": String,
    "story_id": String,
    "kahani_id": String
});

const ProductPricings = mongoose.model('product-pricings', productPricingsSchema);

module.exports = ProductPricings;