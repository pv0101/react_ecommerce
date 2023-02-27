import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams, useState } from "react-router-dom";
import Book from "../components/ui/Book";
import Price from "../components/ui/Price";
import Rating from "../components/ui/Rating";

const BookInfo = ({ books, addToCart, cart }) => {
  //accept books passed from App.js
  //accept addToCart function passed from App.js

  const { id } = useParams(); //useParams hook returns object containing parameters of current URL. Ex: we have Route <Route path="/books/:id" /> and the URL is /books/7. useParams() will return object with key of "id" and value of 7. Destruct the object to get the value of URL parameter (7)
  const book = books.find((book) => +book.id === +id); //use .find to get the book with a .id value equal to id from useParams. Ex: useParams id is 7 so .find will return the object from books data array passed from App.js with book.id = 7
  //id from useParams is a string while book.id is a num. So === will not work (gives undefined). Can use == which will give warning but it works. Can use parseFloat which converts string to float. Can add + to both sides to convert to number (unary plus will convert to number)
  //now book is the object with info on the book with id matching the url id. Can dynamically use this BookInfo.jsx component.

  function bookExistsOnCart() {//Look in cart for book that has id same as url id. Return that object to be used as truthy/falsy value later
    return cart.find(book => book.id === +id);
  }
  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/books" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img src={book.url} alt="" className="book__selected--img" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title}</h2>
                <Rating rating={book.rating} />
                <div className="book__selected--price">
                  <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  />
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Consectetur perferendis autem error quaerat id adipisci quam
                    nesciunt fuga? Quibusdam harum quos quod accusamus facilis
                    voluptas dolore soluta nobis impedit eaque?
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Consectetur perferendis autem error quaerat id adipisci quam
                    nesciunt fuga? Quibusdam harum quos quod accusamus facilis
                    voluptas dolore soluta nobis impedit eaque?
                  </p>
                </div>
                {/* Check to see book is already in cart. Ternary operator will make aboolean from truthy or falsy value?*/}
                {bookExistsOnCart() ? (
                  <Link to="/cart" className="book__link">
                  <button className="btn">Checkout</button>
                  {/* Show Checkout button  */}
                  </Link>
                ) : (
                  <button className="btn" onClick={() => addToCart(book)}>
                    Add to cart
                  </button>
                  // otherwise show Add to cart button
                )}
                {/* When button is clicked. Call addToCart function that was imported from App.js and pass book variable which has an object containing the currently viewed book. Since we are using parentheses to pass book we need an arrow function to prevent function from calling immediately */}
              </div>
            </div>
          </div>
        </div>

        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div>
            <div className="books">
              {
                books
                  .filter((book) => book.rating === 5 && +book.id !== +id)
                  .slice(0, 4)
                  .map((book) => (
                    <Book book={book} key={book.id} />
                  ))
                // filter to select only books with 5 star rating and id not equal to URL id. slice to get only 4 books. map to <Book /> component to print
                //book.id is a number and id is a string so must make them comparable. Otherwise you may get a repeat of the spotlighted book in the Recommended section
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookInfo;
