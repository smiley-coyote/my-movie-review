import React, { Component } from "react";
// import { Questions, QuestionsBtn, Stars } from "../../components/Questions"
import API from "../../utils/API";
// import { push } from 'react-router-redux';
import SearchForm from "../../components/SearchForm"
import Wrapper from "../../components/Wrapper"
import Results from "../../components/Results"
import "./Search.css"
import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Col, Row } from "../../components/Grid";
import { Image, Transformation } from 'cloudinary-react';

let userCritics = [];
let yourRatings = [];
let myCritics = [];
let thisMovie = {};

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
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
      currentuser: {},
      userratings: [],
      usercritics: [],
      success: false
    };
  }

  componentWillReceiveProps(){
    
    this.loadUser();
  }

  handleReviewSubmit = event => {
    event.preventDefault();
    const id = this.props.auth.userId;
    API.submitReview({
      _userId: id,
      review: this.state.writeup,
      imdbID: this.state.id
    }).then(res => {
      API.findUser(id).then(res => {
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
    const id = this.props.auth.userId;
    const username = this.state.currentuser.name
    const title = event.currentTarget.getAttribute("title");
    API.submitRating({
      imdbID: thisid,
      rating: value,
      poster: poster,
      _userId: id,
      title: title,
      username: username
    }).then(res => {
      API.findUser(id).then(res => {
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

  runSearch = () => {
    let movie = window.location.pathname;
    movie = movie.split("/")[2];
  
    let searchResults = [];
    let yourRatings = [];
    API.searchByTitle(movie).then(res => {
       searchResults = res.data.Search;
       yourRatings = this.state.currentuser.ratings;
      
      if(searchResults !== undefined){
        this.setState({ success: true})
        for (let i = 0; i < searchResults.length; i++) {
          let movieTitlePlus = searchResults[i].Title;
          movieTitlePlus = movieTitlePlus.split(" ");
          movieTitlePlus = movieTitlePlus.join("+");
          searchResults[i].plusTitle = movieTitlePlus
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
      
      } else{
        this.setState({ success: false})
      }
     
    })
    
    // this.getUserRating()
    
  }



  loadUser = () => {
    API.findUser(this.props.auth.userId).then(res => {
      
      userCritics = res.data.critics;
   
      yourRatings = res.data.ratings;
      this.setState({ currentuser: res.data })
      this.runSearch();
      // this.loadUserCritics()
    })
  }

  componentDidMount(){
    this.loadUser();
    
   
   
   }

  render() {
    return (
      <Wrapper>
        {this.state.success
        ? <Results>
        {this.state.results.map(result => (
          <Row key={result.imdbID}>
            <div className="search-body">
              <Col size="md-4">
                <div className="search-float-left movie-img">
                  <Link to={"/movie/?q=" + result.imdbID}>
                  {result.Poster !== "N/A"
                ?  <img src={result.Poster} alt={result.Title} />
                : <Image cloudName="dmyiazu6p" publicId="movie_placeholder.png">
                <Transformation width="200" height="300" gravity="faces" crop="fill" />
              </Image>
                }
                   
                  </Link>
                  <Link to={"/movie/?q=" + result.imdbID}>view movie info</Link>
                </div>
              </Col>
              <Col size="md-8">
                <div className="search-content">
                  <h2>{result.Title} ({result.Year})</h2>
              
                 
                </div>
                <Row>
                  <Col size="md-3">
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
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                          </p>
                          : result.yourRating === 2
                            ? <p><span className="head-text">Your Rating:</span>
                              <br />
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                            </p>
                            : result.yourRating === 3
                              ? <p><span className="head-text">Your Rating:</span>
                                <br />
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                              </p>
                              : result.yourRating === 4
                                ? <p><span className="head-text">Your Rating:</span>
                                  <br />
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                  <span className="fa fa-star checked"></span>
                                </p>
                                : null
                      }


                      {result.yourReview !== undefined
                        ? <p><span className="head-text">Your Review:</span>
                          <br />
                          {result.yourReview}</p>
                        : result.yourRating !== undefined
                          ? <Button id={result.imdbID} name={result.Title} className="button-review-submit" bsSize="large" onClick={() => this.handleShow(result.imdbID, result.Title, result.Poster)}>
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
      : <Results>
        <p>Movie not found (check your spelling)</p>
      </Results>
      
      }
             

            </Wrapper>
    )
  }

}



export default Search;