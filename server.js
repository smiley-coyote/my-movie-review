const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const models = require("./models");

const passport = require("passport");
const session = require('express-session');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

 // For Passport
 app.use(session({ secret: 'superSecretpassport',resave: true, saveUninitialized:true})); // session secret
 app.use(passport.initialize());
 app.use(passport.session()); // persistent login sessions
 require('./config/passport.js')(passport,models.User);

// Add routes, both API and view
const routes = require("./routes")(passport);
app.use(routes);


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
//add mongo heroku uri
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/my-movie-review-db"
);

// // Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mymoviedb");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
