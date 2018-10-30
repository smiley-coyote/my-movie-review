import React, { Component } from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';

class Navbar extends Component {

  state = {
    search: ""
  }


  handleInputSubmit = event => {
    event.preventDefault();
    let title = this.state.search;
    title = title.split(" ");
    title = title.join("+")
    this.props.history.push("/search/" + title);
    
  }

  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
     
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/home"><span className="mcr-logo">My Critic Review</span></a>
          </div>
          
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="/home">Menu
        <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to={"/profile"}>Profile</Link></li>
                <li><Link to={"/movie"}>Browse Movies</Link></li>
              </ul>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><a onClick={this.props.handleLogout} href="/"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
          </ul>
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" name="search" onChange={this.handleInputChange} value={this.state.search} className="form-control" placeholder="Search Movie" />
            </div>
            <button type="submit" onClick={this.handleInputSubmit} className="btn btn-default">Submit</button>
          </form>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar);





