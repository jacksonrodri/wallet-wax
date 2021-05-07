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
    assetIds: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Stories', storySchema)