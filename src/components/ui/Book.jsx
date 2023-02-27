import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
import Rating from "./Rating";

const Book = ({ book }) => {
  //passed book data from Featured.jsx (or other parent) which got it from data.js. Use book values to make component dynamic
const [img, setImg] = useState();

const mountedRef = useRef(true);//need to use this because if we start with a refreshed page on the Home page, the books there are also using the loading state and useEffect hook. When we click to the Books page from here, we get a warning "Can't perform a React state update on an unmounted component". setImg() is getting called even though the Home page Book components are unmounted because we are on the Books page. I actually did not get this warning but the tutorial showed it and there was a warning in the tutorial.
//only want to call setImg if the component is mounted to fix warning

useEffect(() => {//as soon as component renders. make new html image and set the source to book.url which links to the image. We are programatticaly creating the image. Using JavaScript not html
  const image = new Image();//make new html image element
  image.src = book.url;//set the html image element source
  image.onload = () => {//.onload fires as soon as browser loads the object
    setTimeout(() => {//set timeout for delay so can actually see skeleton
      if (mountedRef.current) {//if mountedRef is true (component is mounted)
        setImg(image);//set img to html image element
      }
    }, 300)
    //cannot just set setImg(book.url) because book.url is not an html image element. It is just a string. It seems just setting the img tag src to book.url down below will work but the tutorial showed this more complicated method.
  };
  return () => {//useEffect can return a function that only calls when the component unmounts
    //When the component unmounts
    mountedRef.current = false; //to change useRef value must use .current
  }
})


  return (
    <div className="book">
      {img ? ( //if image exists, then show all the html for book. otherwise, show the skeleton
        <>
          <Link to={`/books/${book.id}`}>
            <figure className="book__img--wrapper">
              <img
                src={img.src}
                alt=""
                className="book__img"
              />
            </figure>
          </Link>
          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>
          {/* Use component for ratings instead of this chunk of code every time */}
          <Rating rating={book.rating} />
          {/* <div className="book__ratings">
        {
            new Array(Math.floor(book.rating)).fill(0).map((_, index) => <FontAwesomeIcon icon="star" key={index}/>
            )
            //make new array of Math.floor(book.rating) elements. Math.floor rounds down to nearest integer. fill with zeroes. Then map, passing each element (_) in the array and its index (index), changing each element to the FontAwesomeIcon prop
        }
        {
            !Number.isInteger(book.rating) && <FontAwesomeIcon icon="star-half-alt" />
            //Can use && to shorten ternary operator if one of the two possible results is null. If the condition is true, the result will execute, otherwise null. So need !. We want the half star to print if the number is NOT an integer
            // Number.isInteger(book.rating) ? '' : <FontAwesomeIcon icon="star-half-alt" />
            // use Number.isInteger to check if book.rating is integer. If so do nothing. If not then add a half star
        }
      </div> */}

          {/* Use component for pricing too */}
          <Price
            originalPrice={book.originalPrice}
            salePrice={book.salePrice}
          />
          {/* <div className="book__price">
        {book.salePrice ? (
          <>
            <span className="book__price--normal">${book.originalPrice.toFixed(2)}</span>$
            {book.salePrice.toFixed(2)}
          </>
        ) : (
          <>${book.originalPrice.toFixed(2)}</>
        )}
      </div> */}
        </>
      ) : (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      )}
    </div>
  );
};

export default Book;
