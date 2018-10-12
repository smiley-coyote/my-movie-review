import "./SearchForm.css";
import React from "react";

const Form = props => (
  <div className="row">
    <div className="col-lg-12">
      <br />
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title"><strong> Movie Search</strong></h3>
        </div>
        <form className="search">
          <div className="form-group">
            <label htmlFor="term">Search Term:</label>
            <input
              value={props.value}
              onChange={props.handleInputChange}
              name="movieSearch"
              type="text"
              className="form-control"
              id="search"
            />
            <br />
            <button
              onClick={props.handleFormSubmit}
              className="btn search-btn"
            >
              Search
      </button>
            <button onClick={props.handleFormClear} type="button" className="btn btn-default" id="clear-all">Clear Results</button>
          </div>
        </form>
      </div>
    </div>
  </div>

)

export default Form;