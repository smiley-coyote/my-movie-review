import "./MyCritics.css";
import React from "react";

const MyCritics = props => (

  <div>
    <h2>My Critics</h2>
    <div className="container">
      {props.critics.map(res =>
        <ul key={res.critic}>
         <li>{res.username}</li>
        </ul>
       

      )}
    </div>
  </div>
);

export default MyCritics;