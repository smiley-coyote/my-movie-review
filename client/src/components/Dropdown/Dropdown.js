import React from "react";
import { DropdownButton, MenuItem } from 'react-bootstrap';
import "./Dropdown.css";

const Dropdown = props => {
  return (
    <DropdownButton id={props.title} className="drop-down-btn" title={props.title}>
      <MenuItem onClick={props.handleSelection}>{props.selection}</MenuItem>
    </DropdownButton>
  );
}

export default Dropdown;