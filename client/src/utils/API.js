import axios from "axios";

const BASEURL = "http://www.omdbapi.com/?t=";
const APIKEY = "&y=&plot=short&apikey=65d98e81";

export default {
  // OMDB API call
  search: function(query) {
    let movie = query;
    movie = movie.split(" ");
    movie = movie.join("+")
    return axios.get(BASEURL + movie + APIKEY);
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
  }
};