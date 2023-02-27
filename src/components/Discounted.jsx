import React from 'react';
import { books } from '../data';//get the books array of objects from data.js
import Book from './ui/Book';

const Discounted = () => {
    return (
        <section id="recent">
            <div className="container">
                <div className="row">
                    <h2 className="section__title">
                        Discount <span className="purple">Books</span>
                    </h2>
                    <div className="books">
                        {books
                        .filter(book => book.salePrice > 0)
                        .slice(0, 8)
                        .map(book => (
                        <Book book={book} key={book.id} />
                        ))}
                        {/* take books array of objects that contains info for all books. filter by those books that have a salePrice > 0 (or not null?). Slice to get first 8. Map those array elements to <Book /> component to turn into html tag*/}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Discounted;
