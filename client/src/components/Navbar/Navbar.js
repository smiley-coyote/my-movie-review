import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = props => (
  <nav className="navbar nav nav-tabs bg-primary">
  <a className="navbar-brand" href="/home">MMRD</a>
  <li className="nav-item">
    <Link
      to="/home"
      className={
        window.location.pathname === "/home" ? "nav-link active" : "nav-link"
      }
    >
      Home
    </Link>
  </li>
  
  
  <li className="nav-item">
    <Link
      to="/home"
      className={
        window.location.pathname === "/home" ? "nav-link active" : "nav-link"
      }
    >
      Profile
    </Link>
  </li>
  <form className="form-inline">
    <input className="form-control mr-sm-2" type="search" placeholder="Search Movie" aria-label="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
  </nav>
);

export default Navbar;





