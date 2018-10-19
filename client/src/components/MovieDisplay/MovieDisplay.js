import "./MovieDisplay.css";
import React from "react";
import { Container, Col, Row } from "../Grid"
import { Image, Transformation } from 'cloudinary-react';

const MovieDisplay = props => (
  <Container>
    <Row>
      <div className="movie-display panel">

        <div className="movie-display-body panel-body">
          <Col size="md-4">
            {props.data.Poster !== "N/A"
              ? <img src={props.data.Poster} alt={props.data.Title} />
              : <Image cloudName="dmyiazu6p" publicId="movie_placeholder.png">
                <Transformation width="200" height="300" gravity="faces" crop="fill" />
              </Image>
            }
          </Col>
          <Col size="md-8">
            <div className="movie-info">

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
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </span>
                : props.data.userRating === 2
                  ? <span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
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
                        <span className="fa fa-star checked"></span>
                      </span>
                      : <span>
                        No rating yet
  </span>
              }
                {props.data.criticRating !== undefined
                ?<span className="float-right">
                MyCritic Score: {props.data.criticRating}%</span>
                : <span className="float-right">
                MyCritic Score: No ratings</span>
                }
              </p>

            </div>
          </Col>

          <div className="my-review">
            {props.children}
          </div>

          <div className="scroll critic-review-body">
            <h3>My Critic Reviews</h3>
            {props.critics.map(res => {

              return <div className="critic-review-content">
                <p>{res.username}</p>
                {res.rating === 1
                  ? <span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </span>
                  : res.rating === 2
                    ? <span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </span>
                    : res.rating === 3
                      ? <span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </span>
                      : res.rating === 4
                        ? <span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star"></span>
                        </span>
                        : <p>rating not available</p>
                }
                {res.review !== undefined
                  ? <p>{res.review}</p>
                  : <p>No review submitted</p>
                }
              </div>

            })}
            
          </div>
          
        </div>
        
      </div>
     
    </Row>

  </Container>
)

export default MovieDisplay;