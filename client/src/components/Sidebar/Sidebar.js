import "./Sidebar.css";
import React from "react";

const Sidebar = props => (
  <div className="sidebar main-body panel panel-primary">
  <div className="panel-heading">
    <h3 className="panel-title"><strong>{props.title}</strong></h3>
  </div>
  <div className="panel-body" id="well-section">
  <ul className="list-group search-results">
{props.children}
</ul>
  </div>
</div>

)

export default Sidebar;