import React, { Component } from "react";
// import { Questions, QuestionsBtn, Stars } from "../../components/Questions"
import API from "../../utils/API";
// import { push } from 'react-router-redux';
import SearchForm from "../../components/SearchForm"
import Wrapper from "../../components/Wrapper"
import Results from "../../components/Results"
import TextField from "../../components/form"
import "./Search.css"
import { Button, Modal } from 'react-bootstrap';





class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      movieSearch: "",
      results: [],
      rating: 0,
      title: 0,
      ratings: [],
      show: false,
      id: "",
      title: "",
      poster: "",
      writeup: ""
    };
  }
  getRatings = () => {
    API.findRating(1).then(res => {
      console.log(res.data);
      this.setState({
        ratings: res.data
      })
    })
  }

  handleRatingInputChange = event => {
    event.preventDefault();
    const thisid = event.currentTarget.name
    const value = event.target.htmlFor
    const user = 1

    API.submitRating({
      movie: thisid,
      rating: value,
      userId: user
    }).then(res => console.log(res.data))

    this.setState({
      title: thisid,
      rating: value
    })

    // this.getRatings();

  };

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
   

  };

  handleFormClear = event => {
    event.preventDefault();
    this.setState({ results: [] })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.movieSearch(this.state.movieSearch)
      .then(res => {

        this.setState({ results: res.data.Search })
      })
  };

  handleReviewSubmit = event => {
    event.preventDefault();
    console.log(this.state.writeup)
    console.log(this.state.id);
    console.log(this.state.title);
    const userId = 1
    API.submitReview({
      userId: userId,
      review: this.state.writeup,
      movie: this.state.id
    }).then( res => this.setState({ show: false }))
    
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(id, title, poster) {

    this.setState({ id: id, title: title, poster: poster })
    this.setState({ show: true })
  }


  render() {
    return (
      <Wrapper>

        <SearchForm
          value={this.state.movieSearch}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          handleFormClear={this.handleFormClear}
        >
        </SearchForm>

        <Results>
          {this.state.results.map(result => (
            <div key={result.imdbID}>
              <img src={result.Poster} alt={result.Title} />
              <br />
              <h2>{result.Title}</h2>
              <p>{result.Year}</p>
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
    )
  }

};

export default Search;