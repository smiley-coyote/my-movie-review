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
    topmovies: [],
    currentRatings: []
  };

  runScoreResults = () => {
    userScores.sort(function(a, b){
      return b.score-a.score
  })
  console.log(userScores);
  this.setState({
    topusers: userScores
  })
    // for(let i = 0; i<4; i++){

    // }
  }

  runScore = () => {
    const userSurvey = this.state.currentuser.survey;
    let percentageResult = 0;
    for (let i = 0; i < userScores.length; i++ ){
      let score = 0;
      let thisUser = userScores[i]
      for(let x = 0; x < thisUser.survey.length; x++) {
        const length = thisUser.survey.length
        if(userSurvey[x] > 2 && thisUser.survey[x] > 2) {
          score += 1
          percentageResult = (score / length) * 100
          percentageResult = Math.round(percentageResult)
          userScores[i].score = score
          
          userScores[i].percentage = percentageResult
          
        }
        else if(userSurvey[x] < 3 && thisUser.survey[x] < 3) {
          score += 1
          percentageResult = (score / length) * 100
          percentageResult = Math.round(percentageResult)
          userScores[i].score = score
          
          userScores[i].percentage = percentageResult
          
        }
        else {
          score += 0
          percentageResult = (score / length) * 100
          percentageResult = Math.round(percentageResult)
          userScores[i].score = score
          
          userScores[i].percentage = percentageResult
          
        }
      }
      
    }
    this.runScoreResults()
  }

  runResults = () => {
    const allusers = this.state.allusers;
    for(let i = 0; i<allusers.length; i++){
      
      if(allusers[i].userId !== 1){
        userScores.push({user: allusers[i].username, survey: allusers[i].survey, score: 0, percentage: 0})
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

  loadRatings = () => {
    API.findRating(1).then(res => {
      const myratings = []
      for(let i=0; i<res.data.length; i++){
        API.byId(res.data[i].movie).then(res => myratings.push({
          title: res.data.Title,
          year: res.data.Year,
          poster: res.data.Poster,
          id: res.data.imdbID
        })).then( () => {
          this.setState({
            currentRatings: myratings
          })
        })
        
        console.log(this.state.currentRatings)
      }
     
    })
  }

  loadUser = () => {
    API.findUser(1).then(res => this.setState({currentuser: res.data}))
    .then(()=>this.runFindAll())
    
    
  }

  componentDidMount() {
    this.loadUser();
    this.loadRatings();
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
      <div className="container">
      <h2>Top Users</h2>
      {this.state.topusers.map(res => 
        <ul key={res._id}>
        <li>{res.user}</li>
        <li>{res.percentage}% match</li>
        </ul>
        
        )}
        </div>

        <div className="container">
        <h2>Your Current Ratings:</h2>
        {this.state.currentRatings.map(res => 
          <ul key={res.id}> 
          <li>{res.title}</li>
          <li>{res.year}</li>
          <li>{res.poster}</li>
          </ul>
          
          )}
        </div>
      </div>
    )

  }
};

export default Home;
