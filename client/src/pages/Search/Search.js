import React, { Component, PropTypes } from "react";
import { Questions, QuestionsBtn, Stars } from "../../components/Questions"
import API from "../../utils/API";
import { push } from 'react-router-redux';
import SearchForm from "../../components/SearchForm"
import Wrapper from "../../components/Wrapper"
import Results from "../../components/Results"




class Search extends Component {
  state = {
  movieSearch: "",
  results: [],
  rating: 0
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.movieSearch);
  };

  handleFormClear = event => {
    event.preventDefault();
    this.setState({results: []})
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.movieSearch(this.state.movieSearch)
    .then(res =>{
      console.log(res.data.Search);
      this.setState({ results: res.data.Search})
    })
  };


  render() {
    return (
      <Wrapper>
      <SearchForm
      value={this.state.search}
      handleInputChange={this.handleInputChange}
      handleFormSubmit={this.handleFormSubmit}
      handleFormClear={this.handleFormClear} 
      >
      </SearchForm>
      <Results>
    {this.state.results.map(result => (
         <div key={result._id}>
         <img src={result.Poster} alt={result.Title}/>
         <br />
         <h2>{result.Title}</h2>
         <p>{result.Year}</p>
         <Stars />
         <hr />
         <br />
         <br />
         <br />
         </div>
    ))}
 </Results>

      </Wrapper>
    )
  }

};

export default Search;