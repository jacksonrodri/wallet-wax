const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    NFT_Assets: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Stories', storySchema)