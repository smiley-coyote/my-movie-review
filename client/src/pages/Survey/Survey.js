import React, { Component } from "react";
import {Questions, QuestionsBtn, Stars} from "../../components/Questions"
import API from "../../utils/API";




class Survey extends Component {
  state = {
    question: "The Terminator",
    number: -1,
    selectValue: "1",
    image: "https://m.media-amazon.com/images/M/MV5BODE1MDczNTUxOV5BMl5BanBnXkFtZTcwMTA0NDQyNA@@._V1_SX300.jpg",
    answers: [],
    class: "fa-star"
  };
  handleInputChange = event => {
    // const { name, value } = event.target;
    this.setState({
      selectValue: event.target.value
    });
  };

  nextQuestion = () => {
    const movies = ["Pulp Fiction", "Fifty Shades of Grey", "The Exorcist",
  "2001: A Space Odyssey", "Grown Ups", "Jurassic World", "La La Land", "The Dark Knight",
"Cabin In The Woods", "Twilight", "Transformers", "Avatar", "Gravity", "The Tree of Life",
"Kick-Ass"];
    let x = this.state.number;
    API.search(movies[x]).then( res => {
      let poster = res.data.Poster
      this.setState({
        question: movies[x],
        image: poster
      })
    })
  }

  endQuestions = () => {
    const surveyArr = this.state.answers;
    console.log(surveyArr);
    API.postResults({
      survey: surveyArr
    }).then( () => console.log("posted"))
    
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if(this.state.number < 14) {
      const answer = this.state.selectValue;
      const answers = this.state.answers.map( answers => answers)
      answers.push(answer);
      let number = this.state.number += 1;
    this.setState({
      number: number,
      answers: answers
    })
    this.nextQuestion()
  } else {
    this.endQuestions();
  }
  }

  
  render() {
    
    return ( 
    <div>
    
    <div>
       <Questions>
         <img src={this.state.image} alt={this.state.question} />
      {this.state.question}
       </Questions>
       <select
       className="form-control"
        value={this.state.selectValue} 
        onChange={this.handleInputChange}
       >
       <option value={1}>1</option>
       <option value={2}>2</option>
       <option value={3}>3</option>
       <option value={4}>4</option>
     </select>
     <Stars className={this.state.class} onClick={this.handleStarClick}/>
     </div>
     
   
    
    <QuestionsBtn onClick={this.handleFormSubmit}>Submit</QuestionsBtn>
  </div>
    )
  }
}


export default Survey;
