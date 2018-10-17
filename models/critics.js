const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const criticSchema = new Schema({
  username: { type: String, required: true},
  userId: {type: String, required: true},
  criticId: {type: String, required: true}
});

const Critic = mongoose.model("Critics", criticSchema);

module.exports = Critic;
