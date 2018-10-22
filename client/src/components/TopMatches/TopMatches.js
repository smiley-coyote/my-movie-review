import "./TopMatches.css";
import React from "react";
import { Image, Transformation } from 'cloudinary-react';
import { Link } from "react-router-dom";

const TopMatches = props => (

  <div>
  {props.topusers !== undefined
  ?<div className="black-border padding-xs">
  {props.topusers.map(res =>
      
    <div className="top-matches" key={res.id}>
      <fieldset onClick={props.addCritic} name={res.name} id={res.id}>
        <div>
          <div className="float-left">
          <Link to={"/user/" + res.id}>
            <Image cloudName="dmyiazu6p" publicId={res.image}>
              <Transformation width="100" height="100" gravity="faces" crop="fill" />
            </Image>
            </Link>
            <p>{res.name}</p>
            <p>{res.percentage}% match</p>
          </div>
          <div className="content">
            {res.ratings[0] !== undefined
              ? <div className="latest-rating">
                <p className="heading">Latest Review</p>
                <p>{res.ratings[0].title}</p>
                {res.ratings[0].rating === 1
                  ? <p>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </p>
                  : res.ratings[0].rating === 2
                    ? <p><span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span></p>
                    : res.ratings[0].rating === 3
                      ? <p><span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span></p>
                      : res.ratings[0].rating === 4
                        ? <p><span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span></p>
                        : <p>Rating Unavailable</p>
                }
                {res.ratings[0].review !== undefined
                  ? <div className="overflow-scroll height-med"><p >
                    {res.ratings[0].review}
                  </p>
                  </div>
                  : <p>
                    No written review
            </p>
                }
              </div>
              : <p>No ratings for this user</p>
            }
          </div>

        </div>
        <div className="float-right margin-top-md">
          <button>Add Critic</button>
        </div>
      </fieldset>
      <hr />
    </div>
  )}
  </div>
  : <div>
    <p>data not available</p>
    </div>
  }
    

  </div>
);

export default TopMatches;