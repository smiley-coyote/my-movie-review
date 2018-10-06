import React, { Component, PropTypes } from "react";
import { Questions, QuestionsBtn, Stars } from "../../components/Questions"
import API from "../../utils/API";
import { push } from 'react-router-redux';
import SearchForm from "../../components/SearchForm"
import Wrapper from "../../components/Wrapper"
import Results from "../../components/Results"
import "./Search.css"





class Search extends Component {
  state = {
    movieSearch: "",
    results: [],
    rating: 0,
    title: 0,
  };

  handleRatingInputChange = event => {
    event.preventDefault();
    const thisid = event.currentTarget.name
    const value = event.target.htmlFor
    console.log(thisid)
    console.log(value);

    this.setState({
      title: thisid
    })

  };

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.movieSearch);
  };

  handleFormClear = event => {
    event.preventDefault();
    this.setState({ results: [] })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.movieSearch(this.state.movieSearch)
      .then(res => {
        console.log(res.data.Search);
        this.setState({ results: res.data.Search })
      })
  };


  render() {
    return (
      <Wrapper>
        <p>{this.state.title}</p>
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
              <p>{result.imdbID}</p>
              <fieldset className="rating" name={result.imdbID} onClick={this.handleRatingInputChange}>
                <h3>Please rate:</h3>
                <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="4"></label>
                <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="3"></label>
                <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="2"></label>
                <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="1"></label>
              </fieldset>
            </div>
          ))}
        </Results>


      </Wrapper>
    )
  }

};

export default Search;