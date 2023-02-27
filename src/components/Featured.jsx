import React from "react";
import Book from "./ui/Book";
import { books } from '../data.js';//We are exporting from data.js but not export default. So we need to specify what to pull from data.js: books

const Featured = () => {
    
    

  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Featured <span className="purple">Books</span>
          </h2>
          <div className="books">
            {books
            .filter((book) => book.rating === 5)//use filter to get all the 5 star books
            .slice(0, 4)// Use .slice to get 4 books out of the filtered 6
            .map(book => <Book book={book} key={book.id}/>)//use map to turn every element in array into something else. In this case turning every book into html.
            //each child in a list should have unique key prop. Use book.id as key. Can also do .map((book, index) => <Book key={index} />)
            }
            {/* <div className="book">
                <a href="">
                    <figure className="book__img--wrapper">
                        <img src="https://covers.openlibrary.org/b/id/8091016-L.jpg" alt="" className="book__img" />
                    </figure>
                </a>
                <div className="book__title">
                    <a href="/" className="book__title--link">Atomic Habits
                    </a>
                </div>
                <div className="book__ratings">
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star-half-alt" />
                </div>
                <div className="book__price">
                    <span className="book__price--normal">
                        $15.00
                    </span>
                    $10.00
                </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
