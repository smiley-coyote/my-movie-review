const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: { type: String, required: true},
  imdbID: { type: String, required: true},
  rating: { type: Number, required: true },
  date: {type: Date, default: Date.now },
  poster: { type: String},
  review: { type: String},
});

const Rating = mongoose.model("Ratings", ratingSchema);

module.exports = Rating;
