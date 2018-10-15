import "./MovieDisplay.css";
import React from "react";
import { Container, Col, Row } from "../Grid"
const MovieDisplay = props => (
  <Container>
    <Row>
      <div className="movie-display panel">

        <div className="movie-display-body panel-body">
          <Col size="md-4">
            <img src={props.data.Poster} />
          </Col>
          <Col size="md-8">
            <div className="black-border">
            
              <h2>{props.data.Title}</h2>
              <div className="plot">
                {props.data.Plot}
              </div>
              <div className="inline">
                <p><span className="underline-text">Rated:</span> {props.data.Rated}</p>
                <p><span className="underline-text">Genre:</span> {props.data.Genre}</p>
                <p><span className="underline-text">Released:</span> {props.data.Released}</p>
                <p><span className="underline-text">Runtime:</span> {props.data.Runtime}</p>
              </div>
              <p><span className="your-movie-rating">Your Rating: </span>{props.data.userRating === 1
                ? <span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                </span>
                : props.data.userRating === 2
                  ? <span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                  </span>
                  : props.data.userRating === 3
                    ? <span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                    </span>
                    : props.data.userRating === 4
                      ? <span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </span>
                      : <span>
                        unavailable
  </span>
              }
                <span className="float-right">MyCritic Score: {props.data.criticRating}%</span>
              </p>

            </div>
          </Col>
         
        </div>
        <Row>
          <Col size="md-4">
          </Col>
          <Col size="md-8">
          <div className="scroll">
          {props.critics.map(res =>{
            <div>
              <p>{res.username}</p>
              <p>{res.rating}</p>
            </div>
          })}
          </div>
            </Col>
        </Row>
      </div>

    </Row>

  </Container>
)

export default MovieDisplay;