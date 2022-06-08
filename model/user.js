const mongoose = require('mongoose')

let UserSceme = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model("User", UserSceme)