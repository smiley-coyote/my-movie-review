import axios from "axios";

const BASEURL = "http://www.omdbapi.com/";
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
  movieSearch: function(query){
    let movie = query.trim();
    movie = movie.split(" ");
    movie = movie.join("+");
    return axios.get(BASEURL + "?s=" + movie + "&y&type=movie" + APIKEY)
  },
  // post initial survey results
  postResults: function(data) {
    return axios.put("api/user/results/", data);
  },
  // get user info
  findUser: function(id) {
    return axios.get("api/user/" + id);
  },
  findAll: function(){
    return axios.get("api/user/")
  },
  submitRating: function(data){
    return axios.post("api/rating", data)
  },
  findRatingUser: function(id){
    return axios.get("api/rating/" + id)
  },
  getRatings: function(){
    return axios.get("api/rating/")
  },
  addCritic: function(data){
    return axios.post("api/critic", data);
  },
  submitReview: function(data){
    return axios.put("api/rating", data)
  }
};