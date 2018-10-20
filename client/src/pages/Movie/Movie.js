import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row } from "../../components/Grid";
import MovieDisplay from "../../components/MovieDisplay";
import Wrapper from "../../components/Wrapper";
import Results from "../../components/Results";
import "./Movie.css";
import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

let userCritics = [];
let yourRatings = [];
let myCritics = [];


class Movie extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      display: false,
      movie: null,
      movieholder: null,
      currentuser: {},
      allusers: [],
      navsearch: "",
      results: [],
      rating: 0,
      ratings: [],
      show: false,
      id: "",
      title: "",
      poster: "",
      writeup: "",
      userratings: [],
      usercritics: [],
      currentcriticratings: [],
      currentcriticreviews: [],

    }

  }

  componentWillReceiveProps(){
    this.loadUser();

  }


  handleReviewSubmit = event => {
    event.preventDefault();
    const id = this.props.auth.userId;
    let thisMovie = this.state.movie
    API.submitReview({
      _userId: id,
      review: this.state.writeup,
      imdbID: this.state.id
    }).then(res => {

      API.findUser(id).then(res =>{
        const yourRatings = res.data.ratings;
        let thisMovie = this.state.movie
        for (let i = 0; i < yourRatings.length; i++) {
          if (yourRatings[i].imdbID === thisMovie.imdbID) {
            thisMovie.userRating = yourRatings[i].rating
            thisMovie.userReview = yourRatings[i].review
            if(yourRatings[i].review !== undefined){
              thisMovie.userReview = yourRatings[i].review
            }
          }
  
        }
        console.log(thisMovie)
        this.setState({ show: false, movie: thisMovie })
  
      })
     
      
    })

  }

  handleRatingInputChange = event => {
    event.preventDefault();
    const thisid = event.currentTarget.name;
    const value = event.target.htmlFor;
    const poster = event.currentTarget.getAttribute("image");
    const id = this.props.auth.userId;
    const title = event.currentTarget.getAttribute("title");
    API.submitRating({
      imdbID: thisid,
      rating: value,
      poster: poster,
      _userId: id,
      title: title
    }).then(res => {


      API.findUser(id).then(res =>{
        const yourRatings = res.data.ratings;
        let thisMovie = this.state.movie
        for (let i = 0; i < yourRatings.length; i++) {
          if (yourRatings[i].imdbID === thisMovie.imdbID) {
            thisMovie.userRating = yourRatings[i].rating
            thisMovie.userReview = yourRatings[i].review
            if(yourRatings[i].review !== undefined){
              thisMovie.userReview = yourRatings[i].review
            }
          }
          console.log(res.data)
        }
        console.log(thisMovie)
        this.setState({ show: false, movie: thisMovie })
  
      })



    })
  }



  handleClose() {
    this.setState({ show: false });
  }

  handleShow(id, title, poster) {
    this.setState({ id: id, title: title, poster: poster })
    this.setState({ show: true })
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  getCriticScore = () => {
    const criticRatings = this.state.currentcriticratings;
    let thisMovie = this.state.movieholder
    console.log(criticRatings)
    let score = 0;
    let viewers = 0;
    let percentage = 0;
    if (criticRatings.length > 0) {

      for (let i = 0; i < criticRatings.length; i++) {
        if (criticRatings[i] > 2) {
          score = score += 1
          viewers += 1
          percentage = (score / viewers) * 100
          percentage = Math.round(percentage)
          thisMovie.criticRating = percentage;

        }
        else {
          viewers += 1;
          percentage = (score / viewers) * 100
          percentage = Math.round(percentage)
          thisMovie.criticRating = percentage;
        }

      }
      this.setState({ movie: thisMovie })
    }

  }

  getUserRating = () => {
    const userCritics = this.state.usercritics
    let criticReviews = [];
    let thisMovie = this.state.movieholder;

    console.log(userCritics)
    let criticRatings = [];
    for (let i = 0; i < userCritics.length; i++) {
      const ratings = userCritics[i].ratings
      for (let x = 0; x < ratings.length; x++) {
        if (thisMovie.imdbID === ratings[x].imdbID) {

          criticReviews.push({
            username: userCritics[i].name,
            id: userCritics[i]._id,
            rating: ratings[x].rating,
            review: ratings[x].review
          })

          criticRatings.push(ratings[x].rating)
        }
      }

    }
    console.log(userCritics)
    this.setState({
      currentcriticreviews: criticReviews, currentcriticratings: criticRatings
    })
    console.log(criticReviews)
   

    this.getCriticScore();
  }

  runSingleMovie = movie => {
    console.log(movie)
    API.byId(movie).then(res => {
      let thisMovie = res.data;
      const userRatings = this.state.currentuser.ratings
      const yourRatings = this.state.currentuser.ratings
      for (let i = 0; i < yourRatings.length; i++) {
        if (yourRatings[i].imdbID === thisMovie.imdbID) {
          thisMovie.userRating = yourRatings[i].rating
          thisMovie.userReview = yourRatings[i].review
          if(yourRatings[i].review !== undefined){
            thisMovie.userReview = yourRatings[i].review
          }
        }

      }
      console.log(thisMovie)
      this.setState({ movieholder: thisMovie, display: true })

      this.getUserRating()



    })
  }

  readUrl = () => {
    let movie = window.location.search;
    movie = movie.split("=")
    movie = movie[1]
    console.log(movie)
    if(movie !== undefined){
    this.runSingleMovie(movie);
    }
  }

  


  loadUserCritics = () => {
    const userCritics = this.state.currentuser.critics
    console.log(userCritics)
    if(userCritics !== undefined){
      for (let i = 0; i < userCritics.length; i++) {
        API.findUser(userCritics[i].criticId).then(res => {
          console.log(res.data)
          myCritics.push(res.data)
        })
      }
      this.setState({ usercritics: myCritics })
      this.readUrl()
    }
    

  }

  loadUser = () => {
    API.findUser(this.props.auth.userId).then(res => {
      console.log(res.data);
      userCritics = res.data.critics;
      console.log(userCritics)
      yourRatings = res.data.ratings;
      this.setState({ currentuser: res.data })
      this.loadUserCritics()
    })
  }

  componentDidMount() {
    this.loadUser();

  }

  render() {
    return (
      <div>
      {this.state.movie === null
      ?  null
      
      : <div className="container">
      <div className="row">
        <div className="col-md-12">
          <MovieDisplay
            data={this.state.movie}
            critics={this.state.currentcriticreviews}
          >

            {this.state.movie.userRating === undefined
              ? <div className="star-rating">
                <fieldset title={this.state.movie.Title} image={this.state.movie.Poster} className="rating-movie" name={this.state.movie.imdbID} onClick={this.handleRatingInputChange}>
                  <h3>Please rate:</h3>
                  <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="4"></label>
                  <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="3"></label>
                  <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="2"></label>
                  <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="1"></label>
                </fieldset>
              </div>
              : <span></span>
            }
            {this.state.movie.userReview !== undefined
              ? <p><span className="head-text">Your Review:</span>
                <br />
                {this.state.movie.userReview}</p>
              : this.state.movie.userRating !== undefined
                ? <Button id={this.state.movie.imdbID} name={this.state.movie.Title} bsStyle="primary" bsSize="large" onClick={() => this.handleShow(this.state.movie.imdbID, this.state.movie.Title, this.state.movie.Poster)}>
                  Add A Review
                    </Button>
                : <span></span>
            }

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Review {this.state.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="review-window-contents">
                <img src={this.state.poster} alt={this.state.title} />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="comment">Review:</label>
                  <textarea name="writeup" value={this.state.writeup} onChange={this.handleInputChange} className="form-control" rows="5" id="comment"></textarea>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleReviewSubmit}>Submit Review</Button>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>

          </MovieDisplay>
        </div>
      </div>
    </div>
      
      }
       
        

      </div>
    )
  }

}


export default Movie;