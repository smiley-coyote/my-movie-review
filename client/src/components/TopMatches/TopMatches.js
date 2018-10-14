import "./TopMatches.css";
import React from "react";
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

const TopMatches = props => (

  <div>

    {props.topusers.map(res =>
      <div className="top-matches">
        <fieldset onClick={props.addCritic} key={res._id} name={res.user} id={res.userId}>
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
                  <p>{res.ratings[0].rating} out of 4 stars</p>
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
        <hr />
      </div>
    )}

  </div>
);

export default TopMatches;