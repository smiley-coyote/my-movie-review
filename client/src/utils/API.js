import axios from "axios";

const BASEURL = "https://www.omdbapi.com/";
const APIKEY = "&apikey=65d98e81";

export default {
  // OMDB API call by title
  byTitle: function(query) {
    let movie = query;
    movie = movie.split(" ");
    movie = movie.join("+")
    return axios.get(BASEURL + "?t=" + movie + "&y=&plot=short" + APIKEY);
  },
  // OMDB API call by id
  byId: function(query) {
    let movie = query;
    return axios.get(BASEURL + "?i=" + movie + "&y=&plot=short" + APIKEY);
  },
  // OMDB API movie search
  searchByTitle: function(query){
    return axios.get(BASEURL + "?s=" + query + "&y&type=movie" + APIKEY)
  },
  // Get movie info from OMDB
  singleByTitle: function(movie){
    return axios.get(BASEURL + "?t=" + movie + "&y=&plot=short" + APIKEY);
  },
  // post initial survey results
  postResults: function(data) {
    return axios.put("/api/user/results/", data);
  },
  // get user info
  findUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  forTopMatches: function(){
    return axios.get("/api/user/")
  },
  submitRating: function(data){
    return axios.post("/api/rating", data)
  },
  findRatingUser: function(id){
    return axios.get("/api/rating/" + id)
  },
  getRatings: function(data){
    return axios.get("/api/rating/" + data)
  },
  addCritic: function(data){
    return axios.post("/api/critic", data);
  },
  submitReview: function(data){
    return axios.put("/api/rating/writeup", data)
  },
  uploadImage: function(data){
    return axios.put("/api/user", data);
  },
  submitTopFive: function(data){
    return axios.put("/api/user/topfive", data)
  }
};