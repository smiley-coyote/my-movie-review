import React from "react";
import "./Stars.css"

export const Stars = props => (
<fieldset className="rating">
    <h3>Please rate:</h3>
    <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5" title="Rocks!"></label>
    <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="Pretty good"></label>
    <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="Meh"></label>
    <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="Kinda bad"></label>
</fieldset>
)