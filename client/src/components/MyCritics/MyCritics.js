import "./MyCritics.css";
import React from "react";

const MyCritics = props => (

  <div>
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