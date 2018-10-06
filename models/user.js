const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  userId: { type: Number, required: true },
  friends: { type: Array, required: false},
  survey: { type: Array, of: Number}
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
