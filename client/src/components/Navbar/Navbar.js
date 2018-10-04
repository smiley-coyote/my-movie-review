import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = props => (
  <ul className="nav nav-tabs bg-primary">
  <li className="nav-item">
    <Link
      to="/"
      className={
        window.location.pathname === "/" ? "nav-link active" : "nav-link"
      }
    >
      LogIn
    </Link>
  </li>
  <li className="nav-item">
    <Link
      to="/survey"
      className={
        window.location.pathname === "/survey" ? "nav-link active" : "nav-link"
      }
    >
      Survey
    </Link>
  </li>
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
      to="/search"
      className={
        window.location.pathname === "/search" ? "nav-link active" : "nav-link"
      }
    >
      Search
    </Link>
  </li>
</ul>
);

export default Navbar;