import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Library.svg"//must import images like so to use in <img> tag

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row row__column">
                    <Link to="/">
                        <figure className="footer__logo">
                            <img src={Logo} alt="" className="footer__logo--img" />
                            {/* use imported Logo */}
                        </figure>
                    </Link>
                    <div className="footer__list">
                        <Link to="/" className="footer__link">Home</Link>
                        <span className="footer__link no-cursor">About</span>
                        {/* About does not actually lead anywhere so we have the no-cursor className to make it obvious that is not clickable */}
                        <Link to="/books" className="footer__link">Books
                        </Link>
                        <Link to="/cart" className="footer__link">Cart</Link>
                    </div>
                    <div className="footer__copyright">Copyright &copy; 2023 Library</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
