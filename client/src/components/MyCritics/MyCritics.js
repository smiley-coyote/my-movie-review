import "./MyCritics.css";
import React from "react";
import { Image, Transformation } from 'cloudinary-react';
import { Link } from "react-router-dom";


const MyCritics = props => (

  <div>
    {props.ratings.map(res =>
      <div className="top-matches my-critics-page" key={res.date}>

        <div className="float-left my-critics">
        <Link to={"/movie/?q=" + res.title.split(" ").join("+")}>
          <img src={res.poster} alt={res.title} />
        </Link>
        </div>

        <div className="content">

          <h3>{res.title}</h3>

          <div className="latest-rating">

            <p className="heading">Rating:</p>

            {res.rating === 1

              ? <p>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </p>
              : res.rating === 2
                ? <p><span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span></p>
                : res.rating === 3
                  ? <p><span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span></p>
                  : res.rating === 4
                    ? <p><span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span></p>
                    : <p>Rating Unavailable</p>
            }
            {res.review !== undefined
              ? <p>
                {res.review}
              </p>
              : <p>
                No written review
          </p>
            }
          </div>
        </div>
      


      <Link to={"/user/" + res.id}>
        visit profile
    </Link>
      <hr />
      </div>
  )}


  </div>
);

export default MyCritics;