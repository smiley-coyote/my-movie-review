import axios from "axios";

const BASEURL = "http://www.omdbapi.com/?t=";
const APIKEY = "&y=&plot=short&apikey=65d98e81";

export default {
  search: function(query) {
    let movie = query;
    movie = movie.split(" ");
    movie = movie.join("+")
    return axios.get(BASEURL + movie + APIKEY);
  },
  postResults: function(data) {
    return axios.put("api/results/", data);
  },
  findUser: function(id) {
    return axios.get("api/user/" + id);
  }
};