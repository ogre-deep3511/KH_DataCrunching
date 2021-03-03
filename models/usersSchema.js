const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    "will_remove_it": Number,
    "full_name": String,
    "phone": String,
    "password": String,
    "email": String,
    "country_code": String,
    "is_active": Number,
    "address": String,
    "editors_pick": Number,
    "role_id": Number,
    "followers_count": Number,
    "followings_count": Number,
    "editor_pick": Number,
    "commission": Number,
    "user_name": String,
    "writing_count": Number,
    "referral_code": String,
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;