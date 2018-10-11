import "./TopMatches.css";
import React from "react";

const TopMatches = props => (

  <div>
  
      {props.topusers.map(res =>
        <fieldset onClick={props.addCritic} key={res._id} name={res.user} id={res.userId}>
          <ul>
            <img src={props.placeholder} />
            <p>{res.user}</p>
            <p>{res.percentage}% match</p>
            <button>Add New Critic</button>
          </ul>
        </fieldset>

      )}
   
  </div>
);

export default TopMatches;