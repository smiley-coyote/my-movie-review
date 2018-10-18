import React, { Component } from "react";
import "./Home.css"
// import { Questions, QuestionsBtn, Stars } from "../../components/Questions"
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Sidebar from "../../components/Sidebar";
import Mainbody from "../../components/Mainbody";
import TopMatches from "../../components/TopMatches";
import MyCritics from "../../components/MyCritics"
import Placeholder from "../../images/profile-placeholder.png";
import { Image, Transformation } from 'cloudinary-react';
import { Link } from "react-router-dom";



let userCritics = [];
const topMovies = [
  {
    title: "",
    id: "tt0499549",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 0,
    reviewed: false
  },
  {
    title: "",
    id: "tt3104988",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 0,
    reviewed: false
  },
  {
    title: "",
    id: "tt4263482",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 0,
    reviewed: false
  },
  {
    title: "",
    id: "tt0499549",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 0,
    reviewed: false
  },
  {
    title: "",
    id: "tt6781982",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 0,
    reviewed: false
  }
];

class Home extends Component {


  state = {
    currentuser: {},
    mycritics: [],
    usercurrentcritics: [],
    allusers: [],
    userscores: [],
    topusers: [],
    topmovies: [],
    currentratings: [],
    allRatings: [],
    topuserratings: [],
    button: false,
    title: "Top Matches",
    selection: "My Critics",
    criticratings: []
  };


  setMovieState = () => {
    this.setState({ topmovies: topMovies })
  }

  runGetMovieTitles = () => {
    for (let i = 0; i < topMovies.length; i++) {
      API.byId(topMovies[i].id).then(res => {
        if (topMovies[i].reviewed === false && res.data.Metascore !== "N/A") {
          topMovies[i].percentage = "*" + res.data.Metascore
        }
        let movie = res.data.Title;
        const title = res.data.Title;
        movie = movie.split(" ");
        movie = movie.join("+")
        // const year = res.data.Year;
        // const imdbID = res.data.imdbID;
        topMovies[i].title = title;
        topMovies[i].movie = movie;


      }).then(() => this.setMovieState())

    }

  }



  getTopUserRatings = () => {
    let topUsers = this.state.topusers
    console.log(topUsers)
    for (let i = 0; i < topUsers.length; i++) {
      if (topUsers[i].ratings !== null) {
        let topUserRatings = topUsers[i].ratings
        for (let x = 0; x < topUserRatings.length; x++) {
          let thisTitle = topUserRatings[x].imdbID
          let thisRating = topUserRatings[x].rating
          for (let y = 0; y < topMovies.length; y++) {
            if (topMovies[y].id === thisTitle) {
              let score = topMovies[y].score;
              let viewers = topMovies[y].viewers;
              let percentage = topMovies[y].percentage;
              topMovies[y].reviewed = true;
              if (thisRating > 2) {
                score += 1;
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                topMovies[y].score = score;
                topMovies[y].viewers = viewers;
                topMovies[y].percentage = percentage;
              } else {
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                topMovies[y].score = score;
                topMovies[y].viewers = viewers;
                topMovies[y].percentage = percentage;
              }
            }
          }
        }

        this.setState({ topmovies: topMovies })
      }
    }
  }

  sortTopUserRatings = () => {
    let userScores = this.state.userscores;
    console.log(userScores)
    for (let i = 0; i < userScores.length; i++) {
      if (userScores[i].ratings !== undefined) {
        userScores[i].ratings.sort(function compare(a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);
          return dateB - dateA;
        });

      }
    }
    this.setState({ userscores: userScores })
    this.getTopUserRatings();
  }

  runTopMatchResults = () => {
    let userScores = this.state.userscores;
    let topUsers = [];

    userScores.sort(function (a, b) {
      return b.score - a.score
    })
    for (let i = 0; i < 5; i++) {
      topUsers.push(userScores[i]);
    }
    console.log(topUsers)
    this.setState({
      topusers: topUsers,
      userscores: userScores
    })
    this.sortTopUserRatings();




  }

  runTopMatchFinder = () => {
    let userScores = this.state.userscores;
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
    this.setState({ userscores: userScores })
    this.runTopMatchResults()
  }

  runSurveyResults = () => {
    const allusers = this.state.allusers;
    let userScores = [];
    console.log(allusers);
    for (let i = 0; i < allusers.length; i++) {
      if (allusers[i]._id !== this.props.auth.userId) {
        userScores.push({
          user: allusers[i].name,
          id: allusers[i]._id,
          survey: allusers[i].survey,
          score: 0,
          percentage: 0,
          ratings: allusers[i].ratings,
          image: allusers[i].image
        })
      }

    }
    this.setState({ userscores: userScores })
    this.runTopMatchFinder();
  }

  filterCritics = () => {
    const userCritics = this.state.usercurrentcritics;
    const users = this.state.allusers;


    let filteredUsers = users.filter(res => userCritics.every(
      userCritics => userCritics.criticId !== res._id
    ))



    this.setState({
      allusers: filteredUsers
    })
    this.runSurveyResults()
  }

  runFindAll = () => {
    API.findAll()
      .then(res =>
        this.setState({
          allusers: res.data
        }))
      .then(() => this.filterCritics())
  }

  sortCriticRatings = ratings => {

    let criticRatings = ratings;
    criticRatings.sort((a, b) => a.date.localeCompare(b.date))
    console.log(criticRatings)
    this.setState({
      topuserratings: criticRatings
    })
  }



  getUserCritics = critics => {
    let criticArr = critics;
    let newRatingsArr = []
    console.log(criticArr)
    for (let i = 0; i < criticArr.length; i++) {
      API.findUser(criticArr[i].criticId).then(res => {
        let userName = res.data.name;
        let image = res.data.image;
        console.log(res.data)
        criticArr[i].image = res.data.image;
        criticArr[i].ratings = res.data.ratings;
        for (let x = 0; x < res.data.ratings.length; x++) {
          newRatingsArr.push({
            image: image,
            username: userName,
            imdbID: res.data.ratings[x].imdbID,
            poster: res.data.ratings[x].poster,
            rating: res.data.ratings[x].rating,
            title: res.data.ratings[x].title,
            date: res.data.ratings[x].date,
            review: res.data.ratings[x].review
          })
        }
      })
    }

    console.log(criticArr)
    console.log(newRatingsArr)
    this.setState({ mycritics: criticArr })

    this.sortCriticRatings(newRatingsArr);
  }



  loadUser = () => {


    API.findUser(this.props.auth.userId).then(res => {


      let userCritics = res.data.critics
      console.log(userCritics)
      this.getUserCritics(userCritics);
      this.setState({
        currentuser: res.data,
        usercurrentcritics: userCritics
      })
    }

    ).then(() => {
      this.runFindAll()
    })

  }

  componentDidMount() {

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
    const thisId = this.props.auth.userId
    const name = event.currentTarget.name;
    console.log(criticId)
    console.log(thisId)
    console.log(name)
    API.addCritic({
      username: name,
      userId: thisId,
      criticId: criticId

    }).then(res => {
      console.log(res.data + " added!")
      API.findUser(this.props.auth.userId).then(res => {

        this.setState({ currentuser: res.data })
        this.getUserCritics();

      })
    }
    )
  }

  handleSelection = event => {
    event.preventDefault();
    if (this.state.title === "Top Matches") {
      this.setState({
        title: "My Critics",
        selection: "Top Matches"
      })
    }
    if (this.state.title === "My Critics") {
      this.setState({
        title: "Top Matches",
        selection: "My Critics"
      })
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-3">
            <Sidebar title={"Top Movies"}>
              <ol>
                <div className="top-movies">
                  {this.state.topmovies.map(res =>

                    <Link to={"/movie/?q=" + res.movie}><li key={res.id}>{res.percentage}% {res.title}</li></Link>

                  )}

                  <p className="asterisk">*Metacritic score</p>
                </div>
                <Link to={"/movie"}>view more</Link>

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
                  placeholder={Placeholder}
                />
                : <MyCritics ratings={this.state.topuserratings} critics={this.state.mycritics} />
              }

            </Mainbody>
          </Col>
          <Col size="md-3">
            <Sidebar title={"Welcome, " + this.state.currentuser.name + "!"}>
              <Link to={"/profile"}>

                <Image cloudName="dmyiazu6p" publicId={this.state.currentuser.image}>
                  <Transformation width="150" height="150" gravity="faces" crop="fill" />
                </Image>
              </Link>
              <div className="text-center">
                <Link to={"/profile"}>view profile</Link>
              </div>
            </Sidebar>
          </Col>
        </Row>
      </Container>
    )
  }



};

export default Home;


