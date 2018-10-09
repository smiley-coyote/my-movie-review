import React, { Component } from "react";
import {Questions, QuestionsBtn, Stars} from "../../components/Questions"
import API from "../../utils/API";
import "./Survey.css"

const movies = ["Pulp Fiction", "Fifty Shades of Grey", "Lost In Translation",
"2001: A Space Odyssey", "The Witch", "Jurassic World", "La La Land", "Mad Max: Fury Road",
"Cabin In The Woods", "Twilight", "Transformers", "Interstellar", "Gravity", "The Tree of Life",
"Monty Python and the Holy Grail"];
class Survey extends Component {
  state = {
    question: "",
    number: -1,
    selectValue: "1",
    image: "",
    answers: [],
    id: ""
  };
  handleInputChange = event => {
    // const { name, value } = event.target;
    this.setState({
      selectValue: event.target.value
    });
  };

  nextQuestion = () => {
  
    let x = this.state.number;
    API.byTitle(movies[x]).then( res => {
      console.log(res.data)
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

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if(this.state.number < 14) {
  //     const answer = this.state.selectValue;
  //     const answers = this.state.answers.map( answers => answers)
  //     answers.push(answer);
  //   this.setState({
  //     number: this.state.number += 1,
  //     answers: answers
  //   })
  //   this.nextQuestion()
  // } else {
  //   this.endQuestions();
  // }
  // }

  firstQuestion = () => {
    API.byTitle("Avatar").then( res => {
      let poster = res.data.Poster
      let id = res.data.imdbID
      this.setState({
        question: "Avatar",
        image: poster,
        id: id
      })
    })
  }

  componentDidMount() {
    this.firstQuestion();
  }

  handleRatingInputChange = event => {
    event.preventDefault();
    const thisid = event.currentTarget.name;
    const value = event.target.htmlFor;
    const user = 1;

    API.submitRating({
      movie: thisid,
      rating: value,
      userId: user
    }).then(res => console.log(res.data))

    this.setState({
      title: thisid,
      rating: value
    })

    if(this.state.number < 14) {
      const answer = value;
      const answers = this.state.answers.map( answers => answers)
      answers.push(answer);
    this.setState({
      number: this.state.number += 1,
      answers: answers
    })
    this.nextQuestion()
  } else {
    this.endQuestions();
  }

    // this.getRatings();

  };

  
  render() {
    
    return ( 
    <div>
    
    <div>
       <Questions>
         <img src={this.state.image} alt={this.state.question} />
         <br />
      <h1>{this.state.question}</h1>
       </Questions>
       {/* <select
       className="form-control"
        value={this.state.selectValue} 
        onChange={this.handleInputChange}
       >
       <option value={1}>1</option>
       <option value={2}>2</option>
       <option value={3}>3</option>
       <option value={4}>4</option>
     </select> */}
        <fieldset className="rating" name={this.state.id} onClick={this.handleRatingInputChange}>
                <h3>Please rate:</h3>
                <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="4"></label>
                <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="3"></label>
                <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="2"></label>
                <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="1"></label>
              </fieldset>
     </div>
     
   
    
    {/* <QuestionsBtn onClick={this.handleFormSubmit}>Submit</QuestionsBtn> */}
  </div>
    )
  }
}


export default Survey;
