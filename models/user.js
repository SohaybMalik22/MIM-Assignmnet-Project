const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    balance: Number,
    account: Number,
    email: String,
    password: String,
    confirmpass: String

});

module.exports = mongoose.model("User", userSchema)