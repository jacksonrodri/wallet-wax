// Keys

// username
// role

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Users', userSchema)