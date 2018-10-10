import "./Sidebar.css";
import React from "react";

const Sidebar = props => (
  <div className="sidebar">
  {props.children}
  </div>

)

export default Sidebar;