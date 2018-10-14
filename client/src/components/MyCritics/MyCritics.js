import "./MyCritics.css";
import React from "react";
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';


const MyCritics = props => (

  <div>

    {props.critics.map(res =>
      <div key={res.userId}>
        <div className="float-left">
          <Image cloudName="dmyiazu6p" publicId={res.image}>
            <Transformation width="100" height="100" gravity="faces" crop="fill" />
          </Image>
          <p>{res.user}</p>
        </div>
        <div className="critic-content">
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

        <hr />
      </div>
    )}
  </div>

);

export default MyCritics;