import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import MovieDisplay from "../../components/MovieDisplay";
import Wrapper from "../../components/Wrapper";
import Results from "../../components/Results";
import "./Movie.css";
import { Button, Modal } from 'react-bootstrap';

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
      usercritics: []

    }

  }

  handleReviewSubmit = event => {
    event.preventDefault();
    console.log(this.state.writeup)
    console.log(this.state.id)
    const userId = 6
    API.submitReview({
      userId: userId,
      review: this.state.writeup,
      imdbID: this.state.id
    }).then(res => {
      console.log(res)
      this.setState({ show: false })
    })

  }

  loadAllUsers = () => {
    API.findAll()
      .then(res => 
       console.log(res.data)
        // this.setState({
        //   allusers: res.data
        // }))
      )
  }

  handleClose() {
    this.setState({ show: false });
  }


  loadUser = () => {
    API.findUser(1).then(res => {
      console.log(res.data)
      // this.setState({ currentuser: res.data })
    })

  }

  handleShow(id, title, poster) {

    this.setState({ id: id, title: title, poster: poster })
    this.setState({ show: true })
  }

  runSearchMovie = movie => {
    API.searchByTitle(movie).then(res => {
      let searchResults = res.data.Search;
      let yourRatings = this.state.currentuser.ratings;
      this.setState({results: res.data.Search})
      
    })
  }

  runSingleMovie = movie =>{
    API.singleByTitle(movie).then(res => {
      this.setState({movie: res.data})
    })
  }
  componentDidMount() {
  
    let movie = window.location.search;
    let type;
    movie = movie.split("=")
    type = movie[0]
    movie = movie[1]
    
    // let query = movie.substr(0, 3);
    if (type === "?q") {
      this.setState({ display: "movie" })
      this.runSingleMovie(movie);
    } else if (type === "?search") {
      this.setState({ display: "search"})
      this.runSearchMovie(movie);
    }
    

    this.loadUser();
    this.loadAllUsers();

   

  }


  render() {
    return (
      <div>
        {this.state.display === "movie"
          ? <Container>
            <Row>
              <Col size="md-12">
                <MovieDisplay
                  data={this.state.movie}
                />


              </Col>
            </Row>
          </Container>
          : this.state.display === "search" 
          ? <Wrapper>
            <Results>
              {this.state.results.map(result => (
                <div key={result.imdbID}>
                  <img src={result.Poster} alt={result.Title} />
                  <br />
                  <h2>{result.Title}</h2>
                  <p>{result.Year}</p>
                  {}
                  <p>Your Rating: {result.yourRating}</p>
                  <fieldset className="rating" name={result.imdbID} onClick={this.handleRatingInputChange}>
                    <h3>Please rate:</h3>
                    <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="4"></label>
                    <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="3"></label>
                    <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="2"></label>
                    <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="1"></label>
                  </fieldset>


                  <Button id={result.imdbID} name={result.Title} bsStyle="primary" bsSize="large" onClick={() => this.handleShow(result.imdbID, result.Title, result.Poster)}>
                    Add A Review
              </Button>
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