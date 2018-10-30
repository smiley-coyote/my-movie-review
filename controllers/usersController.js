const db = require("../models");


module.exports = {
  postSurvey: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.body.id }, { "survey": req.body.survey })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function (req, res) {
    db.User
      .findById(req.params.id)
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
    console.log(req.body._id)
    db.User
      .find({ _id: { $ne: req.body._id } })
      .populate("ratings")
      .then(dbUsers => {
        db.User
          .findById(req.body._id)
          .populate("critics")
          .then(currentUser =>
            dbUsers.filter(dbUser => currentUser.critics.every(
              userCritic => userCritic.criticId != dbUser._id
            )
            )
          ).then(dbUsers => {
            const userScores = []
            dbUsers.map(res => userScores.push({
              name: res.name,
              _id: res._id,
              survey: res.survey,
              score: 0,
              percentage: 0,
              ratings: res.ratings,
              image: res.image
            }))
            return userScores
          }
          ).then(users => {
            const userSurvey = req.body.survey;
            let percentageResult = 0;
            for (let i = 0; i < users.length; i++) {
              let score = 0;
              let thisUser = users[i]
              for (let x = 0; x < thisUser.survey.length; x++) {
                const length = thisUser.survey.length
                if (userSurvey[x] > 2 && thisUser.survey[x] > 2) {
                  score += 1
                  percentageResult = (score / length) * 100
                  percentageResult = Math.round(percentageResult)
                  users[i].score = score

                  users[i].percentage = percentageResult

                }
                else if (userSurvey[x] < 3 && thisUser.survey[x] < 3) {
                  score += 1
                  percentageResult = (score / length) * 100
                  percentageResult = Math.round(percentageResult)
                  users[i].score = score

                  users[i].percentage = percentageResult

                }
                else {
                  score += 0
                  percentageResult = (score / length) * 100
                  percentageResult = Math.round(percentageResult)
                  users[i].score = score

                  users[i].percentage = percentageResult

                }
              }

            }
            return users

          }).then(dbUsers => {
        
            dbUsers.sort( (a, b) => {
              return b.score - a.score
            })
            return dbUsers
            
            
          }).then(dbUsers => {
            for (let i = 0; i < dbUsers.length; i++) {
              if (dbUsers[i].ratings !== undefined) {
                dbUsers[i].ratings.sort(function compare(a, b) {
                  var dateA = new Date(a.date);
                  var dateB = new Date(b.date);
                  return dateB - dateA;
                });
        
              }
            }
            return dbUsers
          }).then(dbModel => res.json(dbModel))
          .catch(err => res.status(422)
            .json(err));
      })


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
  postReview: function (req, res) {
    db.Rating
      .findOneAndUpdate({ _userId: req.body._userId, imdbID: req.body.imdbID }, { "review": req.body.review })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  uploadImage: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.body.id }, { "image": req.body.image })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addTopFive: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.body.userId }, { "topmovies": req.body.topfive })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteCritic: function(req, res){
    db.Critic
    .deleteOne({ _id: req.params.id })
    .then(dbCritic => {
      console.log(req.params.id)
      return db.User
      .findOneAndUpdate({ _id: req.user._id }, { $pull: { critics: req.params.id } }, function (err, doc) {
        if (err) {
          console.log("Something wrong when deleting critic!");
        }
        console.log(doc);
      } )
    })
    .then(dbCritic => res.json(dbCritic))
    .catch(err => res.status(422).json(err));
  },
  movieRatings: function (req, res) {
    db.User
    .findById(req.body.id)
    .populate("ratings")
    .populate("critics")
    .then( thisUser =>{
      db.User
      .find({_id: thisUser.critics.map(critics => critics.criticId)})
      .populate("ratings")
      .then( userCritics => 
         userCritics.map(critic => 
          critic.ratings.filter(rating => 
            rating.imdbID === req.body.movie.imdbID)
        )
      ).then( criticRatings => {
        const thisMovie = req.body.movie
        thisMovie.currentUser = thisUser
        
        let writeups = [];
        let score = 0;
        let viewers = 0;
        let percentage = 0;
        console.log(criticRatings)
       
        for (let i = 0; i < criticRatings.length; i++) {
          if(criticRatings[i][0]!==undefined){
          if (criticRatings[i][0].rating > 2) {
            score = score += 1
            viewers += 1
            percentage = (score / viewers) * 100
            percentage = Math.round(percentage)
            thisMovie.criticRating = percentage;
            writeups.push({
              name: criticRatings[i][0].username,
              rating: criticRatings[i][0].rating,
              review: criticRatings[i][0].review,
            _id: criticRatings[i][0]._userId})
  
          }
          //  if(criticRatings[i][0].review !== undefined){
          //  writeups.push({
          //    name: criticRatings[i][0].username,
          //    rating: criticRatings[i][0].rating,
          //    review: criticRatings[i][0].review})
          // }
          else if (criticRatings[i][0].rating < 3){
            viewers += 1;
            percentage = (score / viewers) * 100
            percentage = Math.round(percentage)
            thisMovie.criticRating = percentage;
            writeups.push({
              name: criticRatings[i][0].username,
              rating: criticRatings[i][0].rating,
              review: criticRatings[i][0].review,
              _id: criticRatings[i][0]._userId
            })
          } 
          
        }
        
        }
      
        thisMovie.writeups = writeups
        return thisMovie
      }).then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    })
      
  }
};
