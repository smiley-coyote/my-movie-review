import "./MovieDisplay.css";
import React from "react";
import { Container, Col, Row } from "../Grid"
import { Image, Transformation } from 'cloudinary-react';
import { Link } from "react-router-dom";

const MovieDisplay = props => (
  <Container>
    <Row>
      <div className="movie-display panel" key={props.movie.imdbID}>

        <div className="movie-display-body panel-body">
          <Col size="md-4">
            {props.movie.Poster !== "N/A"
              ? <img src={props.movie.Poster} alt={props.movie.Title} />
              : <Image cloudName="dmyiazu6p" publicId="movie_placeholder.png">
                <Transformation width="200" height="300" gravity="faces" crop="fill" />
              </Image>
            }
          </Col>
          <Col size="md-8">
            <div className="movie-info">

              <h2>{props.movie.Title}</h2>
              <div className="plot">
                {props.movie.Plot}
              </div>
              <div className="inline">
                <p><span className="underline-text">Rated:</span> {props.movie.Rated}</p>
                <p><span className="underline-text">Genre:</span> {props.movie.Genre}</p>
                <p><span className="underline-text">Released:</span> {props.movie.Released}</p>
                <p><span className="underline-text">Runtime:</span> {props.movie.Runtime}</p>
              </div>
              <p><span className="your-movie-rating">Your Rating: </span>
              {props.user.rating !== null
              ? props.user.rating === 1
              ? <span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </span>
            : props.user.rating === 2
            ? <span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </span>
          :props.user.rating === 3
          ? <span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
        </span>
        : props.user.rating === 4
        ? <span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
        </span>
        : <span>
          No rating yet
</span>
:<span>
No rating yet
</span>
              }
              
                {props.movie.myCriticRating != null
                ?<span className="float-right">
                MyCritic Score: {props.movie.myCriticRating}%</span>
                : <span className="float-right">
                MyCritic Score: No ratings</span>
                }
              </p>

            </div>
          </Col>
          <Row>
            <Col size="sm-4">
          <div className="my-review">
            {props.children}
          </div>
          </Col>
          <Col size="sm-3">
          <div className="scroll critic-review-body">
            <h3>My Critic Reviews</h3>
            {props.critics.map(res => {

              return <div className="critic-review-content" key={res._id}>
              <Link to={"/user/" + res._id}>
                <p>{res.name}</p>
                </Link>
                {res.rating !== null
                ?res.rating === 1
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
          : <p>rating not available</p>
                }
                
                {res.review !== null
                  ? <p>{res.review}</p>
                  : <p>No review submitted</p>
                }
              </div>

            })}
            
          </div>
          </Col>
          </Row>
        </div>
        
      </div>
     
    </Row>

  </Container>
)

export default MovieDisplay;