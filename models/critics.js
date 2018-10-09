const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const criticSchema = new Schema({

  username: { type: String, required: true},
  userId: {type: Number},
  criticId: {type: Number}
});

const Critic = mongoose.model("Critics", criticSchema);

module.exports = Critic;
