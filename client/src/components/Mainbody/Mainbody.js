import "./Mainbody.css";
import React from "react";
import Dropdown from "../Dropdown"

const Mainbody = props => (
  <div className="mainbody panel">
  <div className="panel-heading">
    <Dropdown handleSelection={props.handleSelection} selection={props.selection} title={props.title}/>
  </div>
  <div className="panel-body">
  <div className="body-contents">
{props.children}
</div>
  </div>
</div>

)

export default Mainbody;