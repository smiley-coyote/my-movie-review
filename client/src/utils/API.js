import axios from "axios";

const BASEURL = "http://www.omdbapi.com/";
const APIKEY = "&apikey=65d98e81";

export default {
  // OMDB API call
  search: function(query) {
    let movie = query;
    movie = movie.split(" ");
    movie = movie.join("+")
    return axios.get(BASEURL + "?t=" + movie + "&y=&plot=short" + APIKEY);
  },
  // post initial survey results
  postResults: function(data) {
    return axios.put("api/results/", data);
  },
  // get user info
  findUser: function(id) {
    return axios.get("api/user/" + id);
  },
  findAll: function(){
    return axios.get("api/user/")
  },
  movieSearch: function(query){
    let movie = query.trim();
    movie = movie.split(" ");
    movie = movie.join("+");
    return axios.get(BASEURL + "?s=" + movie + "&y&type=movie" + APIKEY)
  },
  submitRating: function(data){
    return axios.post("api/rating", data)
  },
  findRating: function(id){
    return axios.get("api/rating/" + id)
  }
};