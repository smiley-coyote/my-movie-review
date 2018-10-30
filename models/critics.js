const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const criticSchema = new Schema({
  username: { type: String, required: true},
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  criticId: {type: String, required: true}
});

const Critic = mongoose.model("Critics", criticSchema);

module.exports = Critic;
