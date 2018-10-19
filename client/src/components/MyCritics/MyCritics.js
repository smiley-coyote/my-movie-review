import "./MyCritics.css";
import React from "react";
import { Image, Transformation } from 'cloudinary-react';
import { Link } from "react-router-dom";


const MyCritics = props => (

  <div>
    {props.ratings.map(res =>
      <div className="top-matches my-critics-page" key={res.date}>

        <div className="my-critics">
        <Link to={"/user/" + res.id}>
        <Image cloudName="dmyiazu6p" publicId={res.image}>
                  <Transformation width="100" height="100" gravity="faces" crop="fill" />
                </Image>
                
                </Link>
                
        </div>
        
        <div className="mycritic-content">
        <p>{res.username}'s review:</p>
        <Link to={"/movie/?q=" + res.imdbID}>
          <img src={res.poster} alt={res.title} />
        </Link>
  
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
      
      <hr />
      </div>
  )}


  </div>
);

export default MyCritics;