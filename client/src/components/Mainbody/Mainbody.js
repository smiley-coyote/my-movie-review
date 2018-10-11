import "./Mainbody.css";
import React from "react";
import Dropdown from "../Dropdown"

const Mainbody = props => (
  <div className="mainbody panel panel-primary">
  <div className="panel-heading">
    <Dropdown handleSelection={props.handleSelection} selection={props.selection} title={props.title}/>
  </div>
  <div className="panel-body" id="well-section">
  <ul className="list-group search-results">
{props.children}
</ul>
  </div>
</div>

)

export default Mainbody;