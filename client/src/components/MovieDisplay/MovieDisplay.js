import "./MovieDisplay.css";
import React from "react";
import {Container, Col, Row} from "../Grid"
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
  </div>
  </Col>
  </div>

</div>
</Row>
</Container>
)

export default MovieDisplay;