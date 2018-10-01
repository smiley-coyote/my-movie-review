import React, { Component } from "react";
import {Questions, QuestionsBtn, Rating} from "../../components/Questions"
import API from "../../utils/API";




class Survey extends Component {
  state = {
    question: "The Terminator",
    number: -1,
    selectValue: "1",
    image: "https://m.media-amazon.com/images/M/MV5BODE1MDczNTUxOV5BMl5BanBnXkFtZTcwMTA0NDQyNA@@._V1_SX300.jpg",
    answers: []
  };
  handleInputChange = event => {
    console.log("change");
    // const { name, value } = event.target;
    this.setState({
      selectValue: event.target.value
    });
  };

  nextQuestion = () => {
    const movies = ["Pulp Fiction", "Fifty Shades of Grey", "The Exorcist",
  "2001: A Space Odyssey", "Grown Ups", "Jurassic World", "Titanic", "The Dark Knight",
"A Clockwork Orange", "Twilight", "Transformers", "Avatar", "Gravity", "The Tree of Life",
"Kick-Ass"];
    let x = this.state.number;
    API.search(movies[x]).then( res => {
      let poster = res.data.Poster
      console.log(res.data.Poster);
      this.setState({
        question: movies[x],
        image: poster
      })
    })
  }

  handleFormSubmit = event => {
    this.setState({
      number: this.state.number += 1
    })
    this.nextQuestion()
    console.log("submit")
  }

  
  render() {
    
    return ( 
    <div>
    
    <div>
       <Questions>
         <img src={this.state.image} />
      {this.state.question}
       </Questions>
       <select
       className="form-control"
        value={this.state.selectValue} 
        onChange={this.handleInputChange}
       >
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
     </select>
     </div>
     
   
    
    <QuestionsBtn onClick={this.handleFormSubmit}>Submit</QuestionsBtn>
  </div>
    )
  }
}


export default Survey;
