import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import request from 'superagent';
// import Wrapper from "../../components/Wrapper"
import { Image, Transformation } from 'cloudinary-react';
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Sidebar from "../../components/Sidebar";
import Mainbody from "../../components/Mainbody";
import { Button, Modal } from 'react-bootstrap';
import "./UserPage.css";
import { Link } from "react-router-dom";

// let userRatings = [];

class UserPage extends Component {
      state = {
      currentuser: {},
      topmovies: [],
      userratings: [],
      userimage: ""
    };
  

  runUserRatings = () => {
    let ratings = this.state.currentuser.ratings;
    ratings.sort(function compare(a, b) {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateB - dateA;
    });
    this.setState({ userratings: ratings })

  }

  loadUser = () => {
    let user = window.location.pathname;
    user = user.split("/")[2]
    console.log(user);
 
  

    API.findUser(user).then(res => {
      this.setState({ currentuser: res.data })
      this.runUserRatings();
    })

    
 
    // API.findUser(id).then(res => {
    //   console.log(res.data);
    //   this.setState({ currentuser: res.data })
    //   this.runUserRatings();
    // })
  }

  

  componentDidMount () {
   this.loadUser();
   
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col size="md-3">
              <Sidebar title={"My Top Movies"}>
                {this.state.currentuser.topmovies !== undefined
                  ? <ol>
                    {this.state.currentuser.topmovies.map(res =>

                      <li key={res}>{res}</li>

                    )}

                  </ol>
                  : <p>Add top 5 movies</p>

                }
                <button>update</button>

              </Sidebar>
            </Col>

            <Col size="md-6">
              <Mainbody>
                {this.state.userratings !== []
                  ? <div>
                    {this.state.userratings.map(res =>
                      <div className="my-reviews" key={res.imdbID}>
                      <Link to={"/movie/?q=" + res.title.split(" ").join("+")}>
                        <img alt={res.title} src={res.poster} />
                        </Link>
                        <div className="reviews-title">
                        <h3>{res.title}</h3>
                        </div>
                        <div className="reviews-body">
                        <div className="border-box">
                        <p>My rating:</p>
                        {res.rating === 1
                          ? <p><span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span></p>
                          : res.rating === 2
                            ? <p><span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star"></span>
                              <span class="fa fa-star"></span></p>
                            : res.rating === 3
                              ? <p><span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span></p>
                              : res.rating === 4
                                ? <p>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </p>
                                : <p>Rating Unavailable</p>
                        }
                        {res.review !== undefined
                        ?<p>{res.review}
                          <br />
                          -{this.state.currentuser.username}
                        </p>
                        :<p></p>
                        }
                      </div>
                      </div>
                  
                      </div>
                    )}
                  </div>
                  : <div>
                    <p>No Ratings Available</p>
                  </div>

                }
              </Mainbody>
            </Col>
            <Col size="md-3">
              <Sidebar title={this.state.currentuser.name + "'s Profile"}>
                <Image cloudName="dmyiazu6p" publicId={this.state.currentuser.image}>
                  <Transformation width="150" height="150" gravity="faces" crop="fill" />
                </Image>
              </Sidebar>
            </Col>
          </Row>
        </Container>
       




      </div>
    )
  }
}

export default UserPage;