const mongoose = require('mongoose')

let NoteSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    body: {
        type: String
    },
    user: {
        type: String
    },
    archive: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Note", NoteSchema)