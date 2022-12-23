const mongoose = require('mongoose')

const senderSchema = new mongoose.Schema({
    
    email: String,
    sender: Number,
    reciver: Number,
    money: Number,
    meta: {
        send_at: { type: Date, default: Date.now() }
    }

});

module.exports = mongoose.model("Sender", senderSchema)