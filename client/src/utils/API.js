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
  getArticles: function() {
    return axios.get("/api/saved");
  },
  saveArticle: function(data){
    return axios.post("api/saved/", data)
  },
  deleteArticle: function(id){
    return axios.delete("api/saved/" + id)
  }
};

// date examples:
//  'begin_date': "20000112",
  // 'end_date': "20100112"
