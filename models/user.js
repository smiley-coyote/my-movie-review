const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  name: { type: String, required: true},
  image: { type: String, required: true},
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



User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);