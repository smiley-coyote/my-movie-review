import React from "react";
import "./Stars.css"

export const Stars = props => (
<fieldset className="rating">
    <h3>Please rate:</h3>
    <input type="button" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
    <input type="button" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
    <input type="button" id="star2" name="rating" value="2" /><label htmlFor="star2"></label>
    <input type="button" id="star1" name="rating" value="1" /><label htmlFor="star1"></label>
</fieldset>
)