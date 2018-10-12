import React, { Component } from "react";
import API from "../../utils/API"
import { Col, Row, Container } from "../../components/Grid";
import MovieDisplay from "../../components/MovieDisplay"

class Movie extends Component {

  state = {
    movie: {},
    currentuser: {},
    allusers: []
  }

  

  loadAllUsers = () => {
    API.findAll()
      .then(res =>
        this.setState({
          allusers: res.data
        }))
  }


  loadUser = () => {
    API.findUser(1).then(res => {
      this.setState({ currentuser: res.data })
    })

  }

  componentDidMount() {
    let movie = window.location.search;
    movie = movie.replace("?q=", "")
    API.byCompleteTitle(movie).then(res => {
      console.log(res.data)
      this.setState({
        movie: res.data
      })

    })
    this.loadUser();
    this.loadAllUsers();

  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <MovieDisplay
              data={this.state.movie}
            />


          </Col>
        </Row>
      </Container>
    )
  }
}

export default Movie;