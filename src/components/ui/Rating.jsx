// Do not want to go through rating star calculation (copy and paste logic) every time we need to use it. So make a component for it
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react";

const Rating = ({ rating }) => {//passed the rating from parent 
  return (
    <div className="book__ratings">
      {
        new Array(Math.floor(rating)).fill(0).map((_, index) => (
          <FontAwesomeIcon icon="star" key={index} />
        ))
        //make new array of Math.floor(rating) elements. Math.floor rounds down to nearest integer. fill with zeroes. Then map, passing each element (_) in the array and its index (index), changing each element to the FontAwesomeIcon prop
      }
      {
        !Number.isInteger(rating) && (
          <FontAwesomeIcon icon="star-half-alt" />
        )
        //Can use && to shorten ternary operator if one of the two possible results is null. If the condition is true, the result will execute, otherwise null. So need !. We want the half star to print if the number is NOT an integer
        // Number.isInteger(book.rating) ? '' : <FontAwesomeIcon icon="star-half-alt" />
        // use Number.isInteger to check if book.rating is integer. If so do nothing. If not then add a half star
      }
    </div>
  );
};

export default Rating;
