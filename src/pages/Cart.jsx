import React from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty_cart.svg";
const Cart = ({ cart, changeQuantity, removeItem }) => {
  const total = () => {
    //total is a function
    let price = 0; //running total price
    cart.forEach((item) => {
      //forEach goes through each item in cart and performs callback function. Different from .map because .map returns a new array
      price += +(item.quantity * (item.salePrice || item.originalPrice)); //update price with each book's price and quantity
    });
    return price; //return price
  };
  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>
              <div className="cart__body">
                {cart.map((book) => {
                  //want to show every book in cart dynamically. use cart data array that was passed from App.js
                  return (
                    <div className="cart__item">
                      <div className="cart__book">
                        <img
                          src={book.url}
                          alt=""
                          className="cart__book--img"
                        />
                        <div className="cart__book--info">
                          <span className="cart__book--title">
                            {book.title}
                          </span>
                          <span className="cart__book--price">
                            ${(book.salePrice || book.originalPrice).toFixed(2)}
                          </span>
                          {/* Use book.salePrice, if that does not exist use book.originalPrice. Can not .toFixed() both prices because salePrice might be null and you can't .toFixed() null. Put entire OR statement in parentheses and .toFixed() that because you know that will return a number */}
                          <button
                            className="cart__book--remove"
                            onClick={() => removeItem(book)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart__quantity">
                        <input
                          type="number"
                          min={0}
                          max={99}
                          className="cart__input"
                          value={book.quantity} //sets each book's quantity on mount
                          onChange={(event) =>
                            changeQuantity(book, event.target.value)
                          } //use to update quantity of each book
                        />
                      </div>
                      <div className="cart__total">
                        $
                        {(
                          book.quantity * (book.salePrice || book.originalPrice)
                        ).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
              {cart.length === 0 && (
                <div className="cart__empty">
                  <img src={EmptyCart} alt="" className="cart__empty--img" />
                  <h2>You don't have any books in your cart!</h2>
                  <Link to="/books">
                    <button className="btn">Browse books</button>
                  </Link>
                </div>
              )}
            </div>
            {cart.length > 0 && ( //empty array (which is what cart is) is actually a truthy value. Check the length instead. But juts doing cart.length && will not work because && needs a boolean but cart.length is a number. So use cart.length > 0. If cart.length > 0 then the html will render. Otherwise null
              <div className="total">
                <div className="total__item total__sub-total">
                  <span>Subtotal</span>
                  <span>${total().toFixed(2)}</span>
                  {/* subtotal  */}
                </div>
                <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${(total() * 0.1).toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Total</span>
                  <span>${(total() + total() * 0.1).toFixed(2)}</span>
                </div>
                <button
                  className="btn btn__checkout no-cursor"
                  onClick={() => alert(`Not implemented`)}
                >
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
