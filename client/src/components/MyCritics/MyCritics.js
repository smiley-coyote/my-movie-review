import "./MyCritics.css";
import React from "react";
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';


const MyCritics = props => (

  <div>
    <div className="container">
      {props.critics.map(res =>
      <div key={res.critic}>
       <Image cloudName="dmyiazu6p" publicId={res.image}>
       <Transformation width="150" height="150" gravity="faces" crop="fill" />
       </Image>
        
         <p>{res.username}</p>
       
       
        </div>
      )}
    </div>
  </div>
);

export default MyCritics;