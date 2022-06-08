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
    }
})

module.exports = mongoose.model("Note", NoteSchema)