const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/mymoviedb"
);
// "D" good matches, "F" bad matches, "E" mixed
const userSeed = [
  {
    username: "Nick",
    userId: 1
  },
  {
    username: "Derry",
    userId: 2,
    survey: [3, 4, 1, 4, 4, 1, 1, 2, 4, 4, 1, 1, 4, 3, 4]
  },
  {
    username: "Freddie",
    userId: 3,
    survey: [1, 2, 4, 2, 1, 3, 4, 4, 2, 1, 3, 3, 2, 2, 1]
  },
  {
    username: "Eddie",
    userId: 4,
    survey: [1, 2, 4, 2, 1, 3, 4, 4, 2, 1, 3, 3, 2, 2, 1]
  },
  {
    username: "Donnie",
    userId: 5,
    survey: [4, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 2, 3, 3, 4]
  },
  {
    username: "Fanny",
    userId: 6,
    survey: [2, 1, 3, 3, 2, 4, 3, 4, 3, 1, 4, 4, 1, 1, 2]
  },
  {
    username: "Eddie",
    userId: 7,
    survey: [3, 3, 3, 1, 2, 2, 4, 3, 1, 4, 2, 3, 1, 2, 1]
  },
  {
    username: "Dory",
    userId: 8,
    survey: [3, 4, 3, 4, 4, 2, 1, 3, 2, 4, 3, 2, 3, 3, 4]
  },
  {
    username: "Frank",
    userId: 9,
    survey: [1, 2, 4, 3, 2, 3, 2, 4, 3, 1, 3, 4, 2, 3, 2]
  },
  {
    username: "Earl",
    userId: 10,
    survey: [4, 2, 3, 1, 1, 4, 3, 3, 3, 1, 3, 3, 1, 1, 1]
  },
];

const ratingSeed = [
  {
    movie: "tt1270797",
    rating: 1,
    userId: 2,
  },
  {
    movie: "tt1270797",
    rating: 3,
    userId: 3,
  },
  {
    movie: "tt1270797",
    rating: 4,
    userId: 4,
  },
  {
    movie: "tt1270797",
    rating: 1,
    userId: 5,
  },
  {
    movie: "tt1270797",
    rating: 3,
    userId: 6,
  },
  {
    movie: "tt1270797",
    rating: 2,
    userId: 7,
  },
  {
    movie: "tt1270797",
    rating: 2,
    userId: 8,
  },
  {
    movie: "tt1270797",
    rating: 3,
    userId: 9,
  },
  {
    movie: "tt1270797",
    rating: 1,
    userId: 10,
  },
  {
    movie: "tt6781982",
    rating: 1,
    userId: 1,
  },
  {
    movie: "tt6781982",
    rating: 1,
    userId: 2,
  },
  {
    movie: "tt6781982",
    rating: 3,
    userId: 3,
  },
  {
    movie: "tt6781982",
    rating: 2,
    userId: 4,
  },
  {
    movie: "tt6781982",
    rating: 2,
    userId: 5,
  },
  {
    movie: "tt6781982",
    rating: 3,
    userId: 6,
  },
  {
    movie: "tt6781982",
    rating: 1,
    userId: 7,
  },
  {
    movie: "tt6781982",
    rating: 1,
    userId: 8,
  },
  {
    movie: "tt6781982",
    rating: 2,
    userId: 9,
  },
  {
    movie: "tt6781982",
    rating: 3,
    userId: 10,
  },
  {
    movie: "tt6182908",
    rating: 3,
    userId: 1,
  },
  {
    movie: "tt6182908",
    rating: 2,
    userId: 2,
  },
  {
    movie: "tt6182908",
    rating: 3,
    userId: 3,
  },
  {
    movie: "tt6182908",
    rating: 1,
    userId: 4,
  },
  {
    movie: "tt6182908",
    rating: 3,
    userId: 5,
  },
  {
    movie: "tt6182908",
    rating: 2,
    userId: 6,
  },
  {
    movie: "tt6182908",
    rating: 2,
    userId: 7,
  },
  {
    movie: "tt6182908",
    rating: 3,
    userId: 8,
  },
  {
    movie: "tt6182908",
    rating: 1,
    userId: 9,
  },
  {
    movie: "tt6182908",
    rating: 1,
    userId: 10,
  },
  {
    movie: "tt3104988",
    rating: 13,
    userId: 1,
  },
  {
    movie: "tt3104988",
    rating: 3,
    userId: 2,
  },
  {
    movie: "tt3104988",
    rating: 2,
    userId: 3,
  },
  {
    movie: "tt3104988",
    rating: 1,
    userId: 4,
  },
  {
    movie: "tt3104988",
    rating: 2,
    userId: 5,
  },
  {
    movie: "tt3104988",
    rating: 3,
    userId: 6,
  },
  {
    movie: "tt3104988",
    rating: 4,
    userId: 7,
  },
  {
    movie: "tt3104988",
    rating: 3,
    userId: 8,
  },
  {
    movie: "tt3104988",
    rating: 2,
    userId: 9,
  },
  {
    movie: "tt3104988",
    rating: 2,
    userId: 10,
  },
  
]

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  // db.Ratings
  // .remove({})
  // .then(() => db.Ratings.collection.insertMany(ratingSeed))
  // .then(data => {
  //   console.log(data.result.n + " records inserted!");
  //   process.exit(0);
  // })
  // .catch(err => {
  //   console.error(err);
  //   process.exit(1);
  // });
