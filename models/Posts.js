const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Posts = new Schema({
    user: {
      name: "",
      avatar: ""
    },
    content: "",
    description: "",
    likes: 0,
    comments: [
    ],
    created_at: ""
  },
{ versionKey: false })

module.exports = mongoose.model('Posts', Posts)
