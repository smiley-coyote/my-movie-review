const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  userId: { type: Number, required: true },
  image: { type: String, required: true},
  friends: { type: Array, required: false},
  survey: { type: Array, of: Number},
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ratings"
    }
  ],
  critics: [
    {
      type: Schema.Types.ObjectId,
      ref: "Critics"
    }
  ],
  topmovies: [
    {
      type: String
    }
  ]
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
