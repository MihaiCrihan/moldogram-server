const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Messages = new Schema({
        isOwner: 0,
        messageContent: "",
    },
    {versionKey: false})

module.exports = mongoose.model('Messages', Messages)
