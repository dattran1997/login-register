const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const AccountModel = mongoose.model('Account',accountSchema);

module.exports = AccountModel;