const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  movie: { type: String, required: true},
  rating: { type: Number, required: true },
  review: { type: String}
});

const Ratings = mongoose.model("Ratings", ratingSchema);

module.exports = Ratings;
