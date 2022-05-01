const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Push = new Schema(
  {
    token: String
  },
  { versionKey: false }
);

module.exports = mongoose.model("Push", Push);
