const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    name: "",
    password: "",
    avatar: "",
    email: ""
  },
  { versionKey: false }
);

module.exports = mongoose.model("Users", Users);
