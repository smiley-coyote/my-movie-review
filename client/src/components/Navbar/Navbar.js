import React, { Component } from "react";
import "./Navbar.css"

class Navbar extends Component {

  state = {
    search: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <nav className="navbar">
     
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/home">MMRD</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="/home">Menu
        <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="/home">Home</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="/search">Browse</a></li>
              </ul>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
          </ul>
          <form className="navbar-form navbar-left" action={"/movie/"}>
            <div className="form-group">
              <input type="text" name="search" onChange={this.handleInputChange} value={this.state.search} className="form-control" placeholder="Search Movie" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </nav>
    )
  }
}

export default Navbar;





