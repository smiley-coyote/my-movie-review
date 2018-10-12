import "./MovieDisplay.css";
import React from "react";

const MovieDisplay = props => (
  <div className="movie-display panel">

  <div className="movie-display-body panel-body">
  <img src={props.data.Poster} />
  <h2>{props.data.Title}</h2>
  <div className="plot">
  {props.data.Plot}
  </div>
  <p>Rated: {props.data.Rated}</p>
  </div>
</div>

)

export default MovieDisplay;