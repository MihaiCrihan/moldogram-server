const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect( "mongodb://mongo:123@mongodb:27017/app?authSource=admin"  )
}
