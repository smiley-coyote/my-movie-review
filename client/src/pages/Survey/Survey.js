import React, { Component, PropTypes } from "react";
import {Questions, QuestionsBtn, Stars} from "../../components/Questions"
import API from "../../utils/API";
import { push } from 'react-router-redux';




class Survey extends Component {
  state = {
    question: "",
    number: -1,
    selectValue: "1",
    image: "",
    answers: []
  };
  handleInputChange = event => {
    // const { name, value } = event.target;
    this.setState({
      selectValue: event.target.value
    });
  };

  nextQuestion = () => {
    const movies = ["Pulp Fiction", "Fifty Shades of Grey", "Lost In Translation",
  "2001: A Space Odyssey", "The Witch", "Jurassic World", "La La Land", "Mad Max: Fury Road",
"Cabin In The Woods", "Twilight", "Transformers", "Interstellar", "Gravity", "The Tree of Life",
"Monty Python and the Holy Grail"];
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
    }).then( () => this.props.history.push(`/home`))
    
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

  firstQuestion = () => {
    API.search("Avatar").then( res => {
      let poster = res.data.Poster
      this.setState({
        question: "Avatar",
        image: poster
      })
    })
  }

  componentDidMount() {
    this.firstQuestion();
  }

  
  render() {
    
    return ( 
    <div>
    
    <div>
       <Questions>
         <img src={this.state.image} alt={this.state.question} />
         <br />
      <h1>{this.state.question}</h1>
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
