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
const openingMovies = [
  {
    title: "Bohemian Rhapsody",
    id: "tt1727824",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 50,
    reviewed: false
  },
  {
    title: "Boy Erased",
    id: "tt7008872",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 68,
    reviewed: false
  },
  {
    title: "The Hate U Give",
    id: "tt5580266",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 82,
    reviewed: false
  }
];
const topBoxOffice = [
  {
    title: "Halloween",
    id: "tt1502407",
    viewers: 0,
    score: 0,
    percentage: 35,
    metacritic: 66,
    reviewed: false
  },
  {
    title: "A Star Is Born",
    id: "tt1517451",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 88,
    reviewed: false
  },
  {
    title: "Venom",
    id: "tt1270797",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 35,
    reviewed: false
  },
  {
    title: "Goosebumps 2...",
    id: "tt5664636",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 53,
    reviewed: false
  },
  {
    title: "Hunter Killer",
    id: "tt1846589",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 42,
    reviewed: false
  }
];
const popularMovies = [
  {
    title: "Black Panther",
    id: "tt1825683",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 88,
    reviewed: false
  },
  {
    title: "Avengers: Infinity War",
    id: "tt4154756",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 68,
    reviewed: false
  },
  {
    title: "Crazy Rich Asians",
    id: "tt3104988",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 74,
    reviewed: false
  },
  {
    title: "Deadpool 2",
    id: "tt5463162",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 66,
    reviewed: false
  },
  {
    title: "Jurassic World: Fallen...",
    id: "tt4881806",
    viewers: 0,
    score: 0,
    percentage: 0,
    metacritic: 51,
    reviewed: false
  }
]

class Home extends Component {


  state = {
    currentuser: {},
    mycritics: [],
    usercurrentcritics: [],
    allusers: [],
    userscores: [],
    topusers: [],
    openingmovies: [],
    topboxoffice: [],
    popularmovies: [],
    currentratings: [],
    allRatings: [],
    topuserratings: [],
    button: false,
    title: "Top Matches",
    selection: "My Critics",
    criticratings: [],
    dropdown: true
  };



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
        let id = res.data._id
        console.log(res.data)
        criticArr[i].image = res.data.image;
        criticArr[i].ratings = res.data.ratings;
        let resultsNumber = Math.round(res.data.ratings.length / 2)
        if (newRatingsArr.length < 20) {
          for (let x = 0; x < resultsNumber; x++) {
            newRatingsArr.push({
              image: image,
              username: userName,
              id: id,
              imdbID: res.data.ratings[x].imdbID,
              poster: res.data.ratings[x].poster,
              rating: res.data.ratings[x].rating,
              title: res.data.ratings[x].title,
              date: res.data.ratings[x].date,
              review: res.data.ratings[x].review
            })
          }
        }
      })
    }

    console.log(criticArr)
    console.log(newRatingsArr)
    this.setState({ mycritics: criticArr })

    this.sortCriticRatings(newRatingsArr);
  }
  getTopUserRatings = () => {
    let topUsers = this.state.topusers

    // opening movies
    for (let i = 0; i < topUsers.length; i++) {
      if (topUsers[i].ratings !== null) {
        let topUserRatings = topUsers[i].ratings
        for (let x = 0; x < topUserRatings.length; x++) {
          let thisTitle = topUserRatings[x].imdbID
          let thisRating = topUserRatings[x].rating
          for (let y = 0; y < openingMovies.length; y++) {
            if (openingMovies[y].id === thisTitle) {
              let score = openingMovies[y].score;
              let viewers = openingMovies[y].viewers;
              let percentage = openingMovies[y].percentage;
              openingMovies[y].reviewed = true;
              if (thisRating > 2) {
                score += 1;
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                openingMovies[y].score = score;
                openingMovies[y].viewers = viewers;
                openingMovies[y].percentage = percentage;
              } else {
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                openingMovies[y].score = score;
                openingMovies[y].viewers = viewers;
                openingMovies[y].percentage = percentage;
              }
            } if (!openingMovies[y].reviewed) {
              let metaScore = openingMovies[y].metacritic
              openingMovies[y].percentage = "*" + metaScore
            }
          }
        }


      }
    }
    console.log(openingMovies)
    this.setState({ openingmovies: openingMovies })
    // Top box office movies
    for (let i = 0; i < topUsers.length; i++) {
      if (topUsers[i].ratings !== null) {
        let topUserRatings = topUsers[i].ratings
        for (let x = 0; x < topUserRatings.length; x++) {
          let thisTitle = topUserRatings[x].imdbID
          let thisRating = topUserRatings[x].rating
          for (let y = 0; y < topBoxOffice.length; y++) {
            if (topBoxOffice[y].id === thisTitle) {
              let score = topBoxOffice[y].score;
              let viewers = topBoxOffice[y].viewers;
              let percentage = topBoxOffice[y].percentage;
              topBoxOffice[y].reviewed = true;
              if (thisRating > 2) {
                score += 1;
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                topBoxOffice[y].score = score;
                topBoxOffice[y].viewers = viewers;
                topBoxOffice[y].percentage = percentage;
              } else {
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                topBoxOffice[y].score = score;
                topBoxOffice[y].viewers = viewers;
                topBoxOffice[y].percentage = percentage;
              }
            } if (!topBoxOffice[y].reviewed) {
              let metaScore = topBoxOffice[y].metacritic
              topBoxOffice[y].percentage = "*" + metaScore
            }
          }

        }


      }
    }
    console.log(topBoxOffice)
    this.setState({ topboxoffice: topBoxOffice })
    // Popular Movies
    for (let i = 0; i < topUsers.length; i++) {
      if (topUsers[i].ratings !== null) {
        let topUserRatings = topUsers[i].ratings
        for (let x = 0; x < topUserRatings.length; x++) {
          let thisTitle = topUserRatings[x].imdbID
          let thisRating = topUserRatings[x].rating
          for (let y = 0; y < popularMovies.length; y++) {
            if (popularMovies[y].id === thisTitle) {
              let score = popularMovies[y].score;
              let viewers = popularMovies[y].viewers;
              let percentage = popularMovies[y].percentage;
              popularMovies[y].reviewed = true;
              if (thisRating > 2) {
                score += 1;
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                popularMovies[y].score = score;
                popularMovies[y].viewers = viewers;
                popularMovies[y].percentage = percentage;
              } else {
                viewers += 1;
                percentage = (score / viewers) * 100
                percentage = Math.round(percentage)
                popularMovies[y].score = score;
                popularMovies[y].viewers = viewers;
                popularMovies[y].percentage = percentage;
              }
            } if (!popularMovies[y].reviewed) {
              let metaScore = popularMovies[y].metacritic
              popularMovies[y].percentage = "*" + metaScore
            }
          }
        }


      }
    }
    console.log(popularMovies)
    this.setState({
      popularmovies: popularMovies
    })
  }

  runFindAll = () => {
    API.forTopMatches(this.state.currentuser)
      .then(res => {

        let topUsers = [];
        let userNumber;

        userNumber = Math.round(res.data.length / 2)
        for (let i = 0; i < userNumber; i++) {
          topUsers.push(res.data[i]);
        }

        if (res.data.length > 4) {
          this.setState({
            topusers: topUsers,
            allusers: res.data,
            userscores: res.data
          })

          this.getTopUserRatings();
        }
      })

  }



  loadUser = () => {

    API.findUser(this.props.auth.userId).then(res => {
      let userCritics = res.data.critics
      this.getUserCritics(userCritics);
      this.setState({
        currentuser: res.data,
        usercurrentcritics: userCritics
      })
      this.runFindAll()
    }

    )


  }

  componentDidMount() {

    this.loadUser();

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
    API.addCritic({
      username: name,
      userId: thisId,
      criticId: criticId

    }).then(res => {
      this.loadUser();
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

              <div className="top-movies black-border">

                <h3>Opening This Week</h3>
                <ol>
                  {this.state.openingmovies.map(res =>
                    <Link key={res.id} to={"/movie/?q=" + res.id}><li>{res.percentage}% {res.title}</li></Link>
                  )}
                </ol>
                <h3>Top Box Office</h3>
                <ol>
                  {this.state.topboxoffice.map(res =>
                    <Link key={res.id} to={"/movie/?q=" + res.id}><li>{res.percentage}% {res.title}</li></Link>
                  )}
                </ol>
                <h3>Popular Movies</h3>
                <ol>
                  {this.state.popularmovies.map(res =>
                    <Link key={res.id} to={"/movie/?q=" + res.id}><li>{res.percentage}% {res.title}</li></Link>
                  )}
                </ol>

                <p className="asterisk">*Metacritic score</p>

              </div>






            </Sidebar>
          </Col>
          <Col size="md-6">
            <Mainbody
              selection={this.state.selection}
              title={this.state.title}
              handleSelection={this.handleSelection}
              dropdown={this.state.dropdown}
            >
              {this.state.title === "Top Matches"
                ? this.state.topusers.length > 4
                  ? <TopMatches
                    topusers={this.state.topusers}
                    addCritic={this.addCritic}
                    placeholder={Placeholder}
                  />
                  : <div>
                    <p>Loading users...</p>
                  </div>
                : <MyCritics ratings={this.state.topuserratings} critics={this.state.mycritics} />
              }

            </Mainbody>
          </Col>
          <Col size="md-3">
            <Sidebar title={"Welcome, " + this.state.currentuser.name + "!"}>
              <div className="black-border padding-xs">
                <Link to={"/profile"}>

                  <Image cloudName="dmyiazu6p" publicId={this.state.currentuser.image}>
                    <Transformation width="150" height="150" gravity="faces" crop="fill" />
                  </Image>
                </Link>
                <div className="text-center">
                  <Link to={"/profile"}>View profile</Link>
                </div>
              </div>
            </Sidebar>
          </Col>
        </Row>
      </Container>
    )
  }



};

export default Home;


