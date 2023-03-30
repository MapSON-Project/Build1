const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TextSchema = new Schema(
    {
        texts: {type: [String]}
    }
)

module.exports = mongoose.model('Text', TextSchema)