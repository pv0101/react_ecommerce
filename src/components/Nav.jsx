import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LibraryLogo from '../assets/Library.svg';
import { Link } from 'react-router-dom';


//HAD a href="" BEFORE. THIS MAKES PAGE REFRESH EVERY TIME YOU CLICK LINK. INSTEAD USE <Link to=""> TO LINK TO ROUTES AND NOT REFRESH
const Nav = ({ numberOfItems }) => {
    function openMenu() {//function to open hamburger menu
        document.body.classList += " menu--open";
    }

    function closeMenu() {//function to close hamburger menu
        document.body.classList.remove("menu--open");
    }
    return (
       <nav>
        <div className="nav__container">
            <Link to="/">
                <img src={LibraryLogo} alt="" className="logo" />
                {/* Cannot use src="../assets/Library.svg" because React uses webpack? When it is compiling all the files it will have no idea about the folder directory structure. So need to import*/}
            </Link>
            <ul className="nav__links">
                <li className="nav__list">
                    <Link to="/" className="nav__link">
                        Home
                    </Link>
                </li>
                <li className="nav__list">
                    <Link to="/books" className="nav__link">
                        Books
                    </Link>
                </li>
                <button className="btn__menu" onClick={openMenu}>
                    {/* onClick "C" must be capitalized. openMenu does not need parentheses otherwise it calls immediately when page loads. If want to use parenthesis must make arrow function {() => openMenu()}*/}
                    <FontAwesomeIcon icon="bars" />
                    {/* To use FontAwesome in React we need to import it. Google fontawesome react and copy paste the npm lines into terminal */}
                </button>
                <li className="nav__icon">
                    <Link to="/cart" className="nav__link">
                        <FontAwesomeIcon icon="shopping-cart" />
                    </Link>
                    {
                        numberOfItems > 0 && <span className="cart__length">{numberOfItems}</span>
                    }
                    {/* Cart counter. User can add books to cart and counter will update. numberOfItems returns a number so check that it is greater than 0 (there are items in cart). If so then show counter, if not do not show counter. */}
                </li>
            </ul>
            <div className="menu__backdrop">
                <button className="btn__menu btn__menu--close" onClick={closeMenu}>
                    <FontAwesomeIcon icon="times" />
                </button>
                <ul className="menu__links">
                    <li className="menu__list">
                        <Link to="/" className="menu__link">
                            Home
                        </Link>
                    </li>
                    <li className="menu__list">
                        <Link to="/books" className="menu__link">
                            Books
                        </Link>
                    </li>
                    <li className="menu__list">
                        <Link to="/cart" className="menu__link">
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
       </nav>
    );
}

export default Nav;