const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({

  movie: { type: String, required: true},
  rating: { type: Number, required: true },
  review: { type: String},
  userId: {type: Number},
});

const Rating = mongoose.model("Ratings", ratingSchema);

module.exports = Rating;
