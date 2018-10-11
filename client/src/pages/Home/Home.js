import React, { Component } from "react";
// import { Questions, QuestionsBtn, Stars } from "../../components/Questions"
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Sidebar from "../../components/Sidebar";
import Mainbody from "../../components/Mainbody";
import TopMatches from "../../components/TopMatches";
import MyCritics from "../../components/MyCritics"


let userRatings = [];
let allRatings = [];
let topUserRatings = [];
let userScores = [];
let topUsers = [];
const topMovies = [
  {
    title: "",
    id: "tt3104988",
    viewers: 0,
    score: 0,
    percentage: 0
  },
  {
    title: "",
    id: "tt6182908",
    viewers: 0,
    score: 0,
    percentage: 0
  },
  {
    title: "",
    id: "tt1270797",
    viewers: 0,
    score: 0,
    percentage: 0
  },
  {
    title: "",
    id: "tt6781982",
    viewers: 0,
    score: 0,
    percentage: 0
  }
];

class Home extends Component {


  state = {
    currentuser: {},
    allusers: [],
    topusers: [],
    topmovies: [],
    currentratings: [],
    allRatings: [],
    topUserRatings: [],
    button: false,
    title: "Top Matches",
    selection: "My Critics"
  };


  setMovieState = () => {
    this.setState({ topmovies: topMovies })
  }

  runGetMovieTitles = () => {
    for (let i = 0; i < topMovies.length; i++) {
      API.byId(topMovies[i].id).then(res => {
        const title = res.data.Title;
        const year = res.data.Year;
        const imdbID = res.data.imdbID;
        topMovies[i].title = title;
        console.log(topMovies);

      }).then(() => this.setMovieState())

    }

  }



  getTopUserRatings = () => {
    let topUsers = this.state.topusers
    for (let i = 0; i < topUsers.length; i++) {
      if (topUsers[i].ratings !== null) {
        let topUserRatings = topUsers[i].ratings
        for (let x = 0; x < topUserRatings.length; x++) {
          let thisTitle = topUserRatings[x].movie
          let thisRating = topUserRatings[x].rating
          for (let y = 0; y < topMovies.length; y++) {
            if (topMovies[y].id === thisTitle) {
              let score = topMovies[y].score;
              let viewers = topMovies[y].viewers;
              let percentage = topMovies[y].percentage;
              if (thisRating > 2) {
                score += 1;
                viewers += 1;
                percentage = (score / viewers) * 100
                topMovies[y].score = score;
                topMovies[y].viewers = viewers;
                topMovies[y].percentage = percentage;
              } else {
                viewers += 1;
                percentage = (score / viewers) * 100
                topMovies[y].score = score;
                topMovies[y].viewers = viewers;
                topMovies[y].percentage = percentage;
              }
            }
          }
        }
        console.log(topMovies)
        this.setState({ topmovies: topMovies })
      }

    }




  }

  runTopMatchResults = () => {
    userScores.sort(function (a, b) {
      return b.score - a.score
    })
    for (let i = 0; i < 5; i++) {
      topUsers.push(userScores[i]);
    }
    this.setState({
      topusers: topUsers
    })
    this.getTopUserRatings();


  }

  runTopMatchFinder = () => {
    const userSurvey = this.state.currentuser.survey;
    let percentageResult = 0;
    for (let i = 0; i < userScores.length; i++) {
      let score = 0;
      let thisUser = userScores[i]
      for (let x = 0; x < thisUser.survey.length; x++) {
        const length = thisUser.survey.length
        if (userSurvey[x] > 2 && thisUser.survey[x] > 2) {
          score += 1
          percentageResult = (score / length) * 100
          percentageResult = Math.round(percentageResult)
          userScores[i].score = score

          userScores[i].percentage = percentageResult

        }
        else if (userSurvey[x] < 3 && thisUser.survey[x] < 3) {
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
    this.runTopMatchResults()
  }

  runSurveyResults = () => {
    const allusers = this.state.allusers;
    for (let i = 0; i < allusers.length; i++) {

      if (allusers[i].userId !== 1) {
        userScores.push({
          user: allusers[i].username,
          userId: allusers[i].userId,
          survey: allusers[i].survey,
          score: 0,
          percentage: 0,
          ratings: allusers[i].ratings
        })
      }

    }
    this.runTopMatchFinder();
  }

  runFindAll = () => {
    API.findAll()
      .then(res =>
        this.setState({
          allusers: res.data
        }))
      .then(() => this.runSurveyResults())
  }


  // Loads user. Change from userId after Passport setup =======================xxxxxxxxx
  loadUser = () => {
    API.findUser(1).then(res => {
      userRatings = res.data.ratings;
      console.log(userRatings);
      this.setState({ currentuser: res.data })
    }

    ).then(() => this.runFindAll())



  }

  loadAllRatings = () => {
    API.getRatings().then(res =>
      this.setState({
        allRatings: res.data
      }))
  }

  componentDidMount() {
    userScores = [];
    topUsers = [];
    this.loadUser();
    this.runGetMovieTitles();


  }

  buttonClick = () => {
    if (!this.state.button) {
      this.setState({
        button: true
      })
    } else {
      this.setState({
        button: false
      })
    }
  }

  addCritic = event => {
    event.preventDefault();
    const criticId = event.currentTarget.id;
    const thisId = 1;
    const name = event.currentTarget.name;
    API.addCritic({
      username: name,
      userId: thisId,
      criticId: criticId

    }).then(res => {console.log(res.data + " added!")
    API.findUser(1).then(res => {
      userRatings = res.data.ratings;
      this.setState({ currentuser: res.data })
      console.log(res.data);
    })
  }
    )
  }

  handleSelection = event =>{
    event.preventDefault();
    if(this.state.title === "Top Matches"){
      this.setState({
        title: "My Critics",
        selection: "Top Matches"
      })
    }
    if(this.state.title === "My Critics"){
      this.setState({
        title: "Top Matches",
        selection: "My Critics"
      })
    }
  }
  render(){
    return(
    <Container>
      <Row>
        <Col size="md-3">
          <Sidebar title={"Top Movies"}>
           <ol>
               {this.state.topmovies.map(res =>

                <li key={res.id}>{res.percentage}% {res.title}</li>

              )}
            </ol>
          </Sidebar>
        </Col>
        <Col size="md-6">
          <Mainbody 
          selection={this.state.selection} 
          title={this.state.title}
          handleSelection={this.handleSelection}
          >
          {this.state.title === "Top Matches"
          ? <TopMatches 
              topusers={this.state.topusers}
              addCritic={this.addCritic}
          />
          : <MyCritics critics={this.state.currentuser.critics}/>
        }
          
          </Mainbody>
        </Col>
        <Col size="md-3">
          <Sidebar title={"Profile"}/>
        </Col>
      </Row>
    </Container>
    )
  }


  
};

export default Home;


// render() {
//   const thisButton = this.state.button;
//   if (!thisButton) {
//     return (
//       <div className="container">
//         <h1>Welcome {this.state.currentuser.username}</h1>
//         <button onClick={() => this.buttonClick()}>View Critics</button>
//         <div>
//           <h2>Top Matches</h2>
//           <div className="container">
//             {this.state.topusers.map(res =>
//               <fieldset onClick={this.addCritic} key={res._id} name={res.user} id={res.userId}>
//                 <ul>
//                   <li>{res.user}</li>
//                   <li>{res.percentage}% match</li>
//                   <button>Add New Critic</button>
//                 </ul>
//               </fieldset>

//             )}
//           </div>
//           <div className="container">
//             <h2>Top Movies</h2>
//             <ol>
//               {this.state.topmovies.map(res =>

//                 <li key={res.id}>{res.percentage}% {res.title}</li>

//               )}
//             </ol>
//           </div>
//           <div className="container">
//           <h2>All Users:</h2>
//           {this.state.allusers.map(res =>
//             <ul key={res.userId}>
//               <li>{res.username}</li>
//               <li>{res.survey}</li>
//             </ul>

//           )}
//         </div>

//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <div className="container">
//         <h1>Welcome {this.state.currentuser.username}</h1>
//         <button onClick={() => this.buttonClick()}>View Top Matches</button>
//         <div className="container">
//           <h2>Critics:</h2>
//           {this.state.currentuser.critics.map(res =>
//             <ul key={res.criticId}>
//               <li>{res.username}</li>
//             </ul>

//           )}
//         </div>




//       </div>
//     )

//   }
// }
