const db = require("../models");

module.exports = {
  postSurvey: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.body.id }, {"survey" : req.body.survey} )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function (req, res) {
    db.User
      .findById(req.params.id )
      .populate("ratings")
      .populate("critics")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  postUser: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .populate("ratings")
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  postRating: function (req, res) {
    db.Rating
      .create(req.body)
      .then(dbRating => {
        db.User.findOneAndUpdate({ _id: dbRating._userId }, { $push: { ratings: dbRating } }, { upsert: true }, function (err, doc) {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        });
      }).then(dbModel => res.json(dbModel))
      .catch(err => res.status(422)
        .json(err));
  },
  findRating: function (req, res) {
    db.Rating
      .find({ userId: req.params.id })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getRatings: function (req, res) {
    db.Rating
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addCritic: function (req, res) {
    db.Critic
      .create(req.body)
      .then(dbCritic => {
        db.User.findOneAndUpdate({ _id: dbCritic.userId }, { $push: { critics: dbCritic } }, { upsert: true }, function (err, doc) {
          if (err) {
            console.log("Something wrong when adding critic!");
          }
          console.log(doc);
        });
      }).then(dbModel => res.json(dbModel))
      .catch(err => res.status(422)
        .json(err));
  },
  postReview: function(req, res){
    db.Rating
    .findOneAndUpdate({ _userId: req.body._userId, imdbID: req.body.imdbID }, { "review" : req.body.review } )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));

  },
  uploadImage: function(req, res){
    db.User
    .findOneAndUpdate({ _id: req.body.id}, {"image" : req.body.image})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};
