import "./TopMatches.css";
import React from "react";
import { Image, Transformation } from 'cloudinary-react';

const TopMatches = props => (

  <div>
  {props.topusers !== undefined
  ?<div>
  {props.topusers.map(res =>
      
    <div className="top-matches" key={res.id}>
      <fieldset onClick={props.addCritic} name={res.user} id={res.id}>
        <div>
          <div className="float-left">
            <Image cloudName="dmyiazu6p" publicId={res.image}>
              <Transformation width="100" height="100" gravity="faces" crop="fill" />
            </Image>
            <p>{res.user}</p>
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
                  ? <p>
                    {res.ratings[0].review}
                  </p>
                  : <p>
                    No written review
            </p>
                }
              </div>
              : <p>No ratings for this user</p>
            }
          </div>

        </div>
        <div className="float-right">
          <button>Add New Critic</button>
        </div>
      </fieldset>
      <a href={"/" + res._id}>visit profile</a>
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