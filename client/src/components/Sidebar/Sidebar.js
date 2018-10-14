import "./Sidebar.css";
import React from "react";

const Sidebar = props => (
  <div className="sidebar panel">
  <div className="panel-heading">
    <h3 className="panel-title"><strong>{props.title}</strong></h3>
  </div>
  <div className="panel-body">

{props.children}

  </div>
</div>

)

export default Sidebar;