import React from "react";
import "./Grid.css"

export const Col = ({ size, children }) => (
  <div id="col" className={size.split(" ").map(size => "col-" + size).join(" ")}>
    {children}
  </div>
);
