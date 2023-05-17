const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Users = mongoose.model('Users', userSchema);

module.exports = {Users}