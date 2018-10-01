import React from "react";

export const Questions = props => (
  <form>
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">{props.children}</label>
  </div>
</form>
)