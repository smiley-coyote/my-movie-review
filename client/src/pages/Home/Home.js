import React, { Component, PropTypes } from "react";
import { Questions, QuestionsBtn, Stars } from "../../components/Questions"
import API from "../../utils/API";
import { push } from 'react-router-redux';

const userScores = [];

class Home extends Component {
  state = {
    currentuser: {},
    allusers: [],
    topusers: [],
    topmovies: []
  };

  runScoreResults = () => {
    userScores.sort(function(a, b){
      return b.score-a.score
  })
  this.setState({
    topusers: userScores
  })
    // for(let i = 0; i<4; i++){

    // }
  }

  runScore = () => {
    const userSurvey = this.state.currentuser.survey;
    for (let i = 0; i < userScores.length; i++ ){
      let score = 0;
      let thisUser = userScores[i]
      for(let x = 0; x < thisUser.survey.length; x++) {
        if(userSurvey[x] > 2 && thisUser.survey[x] > 2) {
          score += 1
          userScores[i].score = score
        }
        else if(userSurvey[x] < 3 && thisUser.survey[x] < 3) {
          score += 1
          userScores[i].score = score
        }
        else {
          score -= 1
          userScores[i].score = score
        }
      }
      
    }
    this.runScoreResults()
  }

  runResults = () => {
    const allusers = this.state.allusers;
    for(let i = 0; i<allusers.length; i++){
      
      if(allusers[i].userId !== 1){
        userScores.push({user: allusers[i].username, survey: allusers[i].survey, score: 0})
      }
      
    }
    this.runScore();
  }

  runFindAll = () => {
    API.findAll()
    .then(res => 
      this.setState({
        allusers: res.data
      }))
    .then(() => this.runResults())
  }


  loadUser = () => {
    API.findUser(1).then(res => this.setState({currentuser: res.data}))
    .then(()=>this.runFindAll())
    
    
  }

  componentDidMount() {
    this.loadUser();
  }



  render() {
    return (
      <div>
      <h1>Welcome {this.state.currentuser.username}</h1>
      <div className="container">
      <h2>All Users:</h2>
      {this.state.allusers.map(res => 
       <ul key={res.userId}>
         <li>{res.username}</li>
         <li>{res.survey}</li>
       </ul> 
        
        )}
      </div>
      <h2>Top Users</h2>
      {this.state.topusers.map(res => 
        <ul key={res.username}>
        <li>{res.user}</li>
        <li>{res.score}</li>
        </ul>
        
        )}
      </div>
    )

  }
};

export default Home;
