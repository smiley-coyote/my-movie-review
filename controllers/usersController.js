const db = require("../models");

module.exports = {
  postSurvey: function (req, res) {
    db.User
      .findOneAndUpdate({ userId: 1 }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function (req, res) {
    db.User
      .findOne({ userId: req.params.id })
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
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  postRating: function (req, res) {
    db.Rating
      .create(req.body)
      .then(dbRating => {
        db.User.findOneAndUpdate({ userId: dbRating.userId }, { $push: { ratings: dbRating } }, { new: true }, function (err, doc) {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        });
      })
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
        db.User.findOneAndUpdate({ userId: dbCritic.userId }, { $push: { critics: dbCritic } }, { new: true }, function (err, doc) {
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
    .findOneAndUpdate({ userId: req.body.userId, imdbID: req.body.imdbID }, { "review" : req.body.review } )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));

  },
  uploadImage: function(req, res){
    db.User
    .findOneAndUpdate({ userId: 1}, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};



// example:
// module.exports = {
//   findAll: function(req, res) {
//     db.Book
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.Book
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
// };
