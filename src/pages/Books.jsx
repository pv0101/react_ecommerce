import React, { useState } from "react";
import Book from "../components/ui/Book";
// import { books } from "../data"; Can pass books data from parent App.js

const Books = ({ books: initialBooks }) => {//pass books data from App.js. Rename as initialBooks
    const [books, setBooks] = useState(initialBooks);//useState hook sets variable books, default value is initialBooks which is books data passed from App.js
    //using hooks like useState will rerender component every time books is changed using setBooks
    function filterBooks(filter) {
        if (filter === 'LOW_TO_HIGH') {
            setBooks(books.slice().sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)))
            //must use setBooks to change books
            //sort actually changes the array 'books'. React does not like that. use slice to make a clone of the array
            //.sort goes through the elements in array and calls them a or b. Conditions are whether a.price - b.price is positive, negative, or zero. || notation means if a has salePrice use that, otherwise use originalPrice. Same for b.
        }
        else if (filter === 'HIGH_TO_LOW') {
            setBooks(books.slice().sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)))
        }
        else if (filter === 'RATING') {
            setBooks(books.slice().sort((a, b) => (b.rating - a.rating)))
        }
    }

  return (
    <div id="books__body">
      <main id="books__main">
        <section>
          <div className="books__container">
            <div className="row">
              <div className="books__header">
                <h2 className="section__title books__header--title">
                  All Books
                </h2>
                <select id="filter" defaultValue="DEFAULT" onChange={(event) => filterBooks(event.target.value)}>
                    {/* Sort dropdown menu */}
                    {/* To get actual value in option tags, use arrow function for onChange. By default it will give an event. Need to pass (to filterBooks) event and target value because that is where the value is coming from*/}
                  {/* React wants to use defaultValue or value props on <select> instead of setting 'selected' on <option> */}
                  <option value="DEFAULT" disabled>
                    Sort
                  </option>
                  <option value="LOW_TO_HIGH">Price, Low to High</option>
                  <option value="HIGH_TO_LOW">Price, High to Low</option>
                  <option value="RATING">Rating</option>
                </select>
              </div>
              <div className="books">
                {books.map((book) => (
                  <Book book={book} key={book.id} />
                ))}
                {/* Instead of changing books data imported from parent App.js, use useState hook to set new variable */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Books;
