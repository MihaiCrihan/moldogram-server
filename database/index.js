const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://admin123:B9IdD1RN24olr4Nk@cluster0.4mzcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  )
}
