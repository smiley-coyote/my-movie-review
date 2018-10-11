import "./TopMatches.css";
import React from "react";

const TopMatches = props => (

  <div>
    <h2>Top Matches</h2>
    <div className="container">
      {props.topusers.map(res =>
        <fieldset onClick={props.addCritic} key={res._id} name={res.user} id={res.userId}>
          <ul>
            <li>{res.user}</li>
            <li>{res.percentage}% match</li>
            <button>Add New Critic</button>
          </ul>
        </fieldset>

      )}
    </div>
  </div>
);

export default TopMatches;