import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row } from "../../components/Grid";
import MovieDisplay from "../../components/MovieDisplay";
import Wrapper from "../../components/Wrapper";
import Results from "../../components/Results";
import "./Movie.css";
import { Button, Modal } from 'react-bootstrap';

let userCritics = [];
let yourRatings = [];
let myCritics = [];
let thisMovie = {};

class Movie extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      display: "",
      movie: {},
      currentuser: {},
      allusers: [],
      movieSearch: "",
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
      currentcriticreviews: []

    }

  }

  handleReviewSubmit = event => {
    event.preventDefault();
    const userId = 1
    API.submitReview({
      userId: userId,
      review: this.state.writeup,
      imdbID: this.state.id
    }).then(res => {
      API.findUser(1).then(res => {
        const yourRatings = res.data.ratings;
        let searchResults = this.state.results
        for (let i = 0; i < searchResults.length; i++) {
          for (let x = 0; x < yourRatings.length; x++) {
            if (searchResults[i].imdbID === yourRatings[x].imdbID) {
              searchResults[i].yourRating = yourRatings[x].rating
              if (yourRatings[x].review !== undefined) {
                searchResults[i].yourReview = yourRatings[x].review
              }
            }
          }
        }
        this.setState({ results: searchResults })
      })
      this.setState({ show: false })
    })

  }

  handleRatingInputChange = event => {
    event.preventDefault();
    const thisid = event.currentTarget.name;
    const value = event.target.htmlFor;
    const poster = event.currentTarget.getAttribute("image");
    const user = 1;
    const title = event.currentTarget.getAttribute("title");
    API.submitRating({
      imdbID: thisid,
      rating: value,
      poster: poster,
      userId: user,
      title: title
    }).then(res => {
      API.findUser(1).then(res => {
        const yourRatings = res.data.ratings;
        let searchResults = this.state.results
        for (let i = 0; i < searchResults.length; i++) {
          for (let x = 0; x < yourRatings.length; x++) {
            if (searchResults[i].imdbID === yourRatings[x].imdbID) {
              searchResults[i].yourRating = yourRatings[x].rating
            }
          }
        }
        this.setState({ results: searchResults })
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
      console.log(percentage + "=" + score + "/" + viewers)
      this.setState({ movie: thisMovie })
      this.setState({display: "search"})
      this.setState({display: "movie"})
    }

  }

  getUserRating = () => {
    const userCritics = this.state.usercritics
    let criticReviews = [];

    console.log(userCritics)
    let criticRatings = [];
    for (let i = 0; i < userCritics.length; i++) {
      const ratings = userCritics[i].ratings
      for (let x = 0; x < ratings.length; x++) {
        if (thisMovie.imdbID === ratings[x].imdbID) {

          criticReviews.push({
            username: userCritics[i].username,
            rating: ratings[x].rating,
            review: ratings[x].review
          })

          criticRatings.push(ratings[x].rating)
        }
      }

    }
    console.log(criticReviews)
    this.setState({
      currentcriticratings: criticRatings
    })
    this.setState({
      currentcriticreviews: criticReviews
    })
    this.getCriticScore();
  }

  readUrl = () => {
    let movie = window.location.search;
    let type;
    movie = movie.split("=")
    type = movie[0]
    movie = movie[1]

    if (type === "?q") {
      this.setState({ display: "movie" })
      this.runSingleMovie(movie);
    } else if (type === "?search") {
      this.setState({ display: "search" })
      this.runSearchMovie(movie);
    }
  }



 
  runSearchMovie = movie => {
    API.searchByTitle(movie).then(res => {
    
     

      let searchResults = res.data.Search;
      let yourRatings = this.state.currentuser.ratings;
      console.log(yourRatings)
      // for (let i = 0; i < searchResults.length; i++) {
      //   let movieTitlePlus = searchResults[i].Title;
      //   movieTitlePlus = movieTitlePlus.split(" ");
      //   movieTitlePlus = movieTitlePlus.join("+");
      //   searchResults[i].plusTitle = movieTitlePlus
      //   for (let x = 0; x < yourRatings.length; x++) {
      //     if (searchResults[i].imdbID === yourRatings[x].imdbID) {
      //       searchResults[i].yourRating = yourRatings[x].rating
      //       if (yourRatings[x].review !== undefined) {
      //         searchResults[i].yourReview = yourRatings[x].review
      //       }
      //     }
      //   }
      // }
      this.setState({ results: searchResults })

    })
  }

  runSingleMovie = movie => {
    API.singleByTitle(movie).then(res => {
      thisMovie = res.data;
      // const userRatings = this.state.currentuser.ratings
      // const yourRatings = this.state.currentuser.ratings
      // for (let i = 0; i < yourRatings.length; i++) {
      //   if (yourRatings[i].imdbID === thisMovie.imdbID) {
      //     thisMovie.userRating = yourRatings[i].rating
      //   }
      // }
      this.setState({movie: thisMovie})

      // this.getUserRating()



    })
  }


  loadUserCritics = () => {
    const userCritics = this.state.currentuser.critics
    for (let i = 0; i < userCritics.length; i++) {
      API.findUser(userCritics[i]._id).then(res => {
        myCritics.push(res.data)
      })
    }
    this.setState({ usercritics: myCritics })
    
  }

  loadUser = () => {
    API.findUser("5bc2904b27b72c5208fad2b5").then(res => {
      console.log(res.data);
      userCritics = res.data.critics;
      console.log(userCritics)
      yourRatings = res.data.ratings;
      this.setState({ currentuser: res.data })
      // this.loadUserCritics()
    })
  }

  componentDidMount(){
  //  this.loadUser();
    let movie = window.location.search;
    console.log(movie)
    movie = movie.split("=")
    let type = movie[0]
    movie = movie[1]
     
    if (type === "?q") {
      this.setState({ display: "movie" })
      this.runSingleMovie(movie);
    } else if (type === "?search") {
      this.setState({ display: "search" })
      this.runSearchMovie(movie);
    }
  
  }

 

 


  render() {
    return (
      <div>
        {console.log("movie page")}
        {this.state.display === "movie"
          ? <div className="container">
            <div className="row">
              <div className="col-md-12">
                <MovieDisplay
                  data={this.state.movie}
                  critics={this.state.currentcriticreviews}
                />
              </div>
            </div>
          </div>
          : this.state.display === "search"
            ? <Wrapper>
              <Results>
                {this.state.results.map(result => (
                  <Row>
                    <div className="search-body" key={result.imdbID}>
                      <Col size="md-4">
                        <div className="search-float-left">
                          <a href={"/movie?q=" + result.plusTitle}>
                            <img src={result.Poster} alt={result.Title} />
                          </a>
                          <a href={"/movie?q=" + result.plusTitle}>view movie info</a>
                        </div>
                      </Col>
                      <Col size="md-8">
                        <div className="search-content">
                          <h2>{result.Title} ({result.Year})</h2>
                          <p>{result.Plot}</p>
                        </div>
                        <Row>
                          <Col size="md-4">
                            <div className="your-rating">

                              {result.yourRating === undefined
                                ? <Row>
                                  <Col size="md-12">
                                    <div className="star-rating">
                                      <fieldset title={result.Title} image={result.Poster} className="rating" name={result.imdbID} onClick={this.handleRatingInputChange}>
                                        <h3>Please rate:</h3>
                                        <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="4"></label>
                                        <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="3"></label>
                                        <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="2"></label>
                                        <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="1"></label>
                                      </fieldset>
                                    </div>
                                  </Col>
                                </Row>
                                : result.yourRating === 1
                                  ? <p><span className="head-text">Your Rating:</span>
                                    <br />
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                  </p>
                                  : result.yourRating === 2
                                    ? <p><span className="head-text">Your Rating:</span>
                                      <br />
                                      <span class="fa fa-star checked"></span>
                                      <span class="fa fa-star checked"></span>
                                      <span class="fa fa-star"></span>
                                      <span class="fa fa-star"></span>
                                    </p>
                                    : result.yourRating === 3
                                      ? <p><span className="head-text">Your Rating:</span>
                                        <br />
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                      </p>
                                      : result.yourRating === 4
                                        ? <p><span className="head-text">Your Rating:</span>
                                          <br />
                                          <span class="fa fa-star checked"></span>
                                          <span class="fa fa-star checked"></span>
                                          <span class="fa fa-star checked"></span>
                                          <span class="fa fa-star checked"></span>
                                        </p>
                                        : <p>Your Rating is not available at this time</p>
                              }


                              {result.yourReview !== undefined
                                ? <p><span className="head-text">Your Review:</span>
                                  <br />
                                  {result.yourReview}</p>
                                : result.yourRating !== undefined
                                  ? <Button id={result.imdbID} name={result.Title} bsStyle="primary" bsSize="large" onClick={() => this.handleShow(result.imdbID, result.Title, result.Poster)}>
                                    Add A Review
                        </Button>
                                  : <p>Rate Movie Before Writing Review</p>
                              }


                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Review {this.state.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <img src={this.state.poster} alt={this.state.title} />
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
                    </div>
                  </Row>
                ))}

              </Results>

            </Wrapper>
            : <h1>Error</h1>
        }

      </div>
    )
  }

}


export default Movie;