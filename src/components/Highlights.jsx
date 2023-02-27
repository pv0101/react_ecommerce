import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import Highlight from "./ui/Highlight";

const Highlights = () => {
    return (
        <section id="highlights">
            <div className="container">
                <div className="row">
                    <h2 className="section__title">
                        Why choose <span className="purple">Library</span>
                    </h2>
                    <div className="highlight__wrapper">
                        {/* Use dynamic components Highlight instead of hardcoding html */}
                        <Highlight icon={<FontAwesomeIcon icon="bolt" />}
                        title="Easy and Quick"
                        para="Get access to the book you purchased online instantly."
                        />
                        {/* FontAwesomeIcon is not defined in Highlight.jsx and we don't want to have to import it there. We can import components as props. Import FontAwesomeIcon component as prop*/}
                        <Highlight icon={<FontAwesomeIcon icon="book-open" />}
                        title="10,000+ Books"
                        para="Library has books in all your favorite categories."
                        />
                        <Highlight icon={<FontAwesomeIcon icon="tags" />}
                        title="Affordable"
                        para="Get your hands on popular books for as little as $10."
                        />
                        {/* <div className="highlight">
                            <div className="highlight__img">
                                <FontAwesomeIcon icon="bolt" />
                            </div>
                            <h3 className="highlight__subtitle">Easy and Quick</h3>
                            <p className="highlight__para">
                                Get access to the book you purchased online instantly.
                            </p>
                        </div>
                        <div className="highlight">
                            <div className="highlight__img">
                                <FontAwesomeIcon icon="book-open" />
                            </div>
                            <h3 className="highlight__subtitle">10,000+ Books</h3>
                            <p className="highlight__para">
                                Library has books in all your favorite categories.
                            </p>
                        </div>
                        <div className="highlight">
                            <div className="highlight__img">
                                <FontAwesomeIcon icon="tags" />
                            </div>
                            <h3 className="highlight__subtitle">Affordable</h3>
                            <p className="highlight__para">
                                Get your hands on popular books for as little as $10.
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Highlights;