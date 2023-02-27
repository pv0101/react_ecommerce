// import Discounted from "./components/Discounted";
// import Explore from "./components/Explore";
// import Featured from "./components/Featured";
import Footer from "./components/Footer";
// import Highlights from "./components/Highlights";
// import Landing from "./components/Landing";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data"; //Want App.js knowing about the books data and pass it along to components as necessary instead of importing books data into each component
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import React, { useState, useEffect } from "react";

// Must import components used
// Discounted, Explore, Featured, Highlights, Landing are grouped and imported in the Home component. So we can remove those imports and just import Home here

//All Cart logic will be in App.js
function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
    //when changing cart, keep everything already in the cart. Then add book, keeping everything in book but adding a quantity value of 1
  }

  //THIS FUNCTION ARCHITECTURE IS TOO COMPLICATED AND LETS USER SPAM ADDITIONS TO CART
  // function addToCart(book) {
  //   const dupeItem = cart.find(item => +item.id === +book.id)//Check cart elements to see if any of the objects have an id that is equal to the book.id being passed (in other words look if the book being added to the cart is already in the cart). Will return undefined if no duplicates found. If duplicate found will return the element in the cart
  //   if (dupeItem) {//if dupeItem exists
  //     setCart(cart.map(item => {//map through all items in the cart array
  //       if (item.id === dupeItem.id) {//if the current iteration of items in the cart has id === to dupeItem.id
  //         return {//return the item but increment quantity value
  //           ...item,
  //           quantity: item.quantity + 1
  //         }
  //       }
  //       else {//the current iteration of items in the cart is not the duplicate. just return the item with no changes
  //         return item
  //       }
  //     }))
  //   }
  //   else {
  //     setCart([...cart, {...book, quantity: 1}]);
  //     //use spread operator to use all elements already in cart array, then add book. With book, we are using spread operator again. Taking all properties from book and add quantity value.
  //   }
  // }

  function changeQuantity(book, quantity) {
    //pass to Cart component for changing book quantities
    setCart(
      cart.map((item) => 
        //map through each item in cart
        //use ternary operator
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
        // if (item.id === book.id) {//if current iteration item in cart matches book that we changed quantity of
        //   return {
        //     ...item,//return the iteration item in cart
        //     quantity: +quantity,//but update the iteration item in cart quantity value to quantity that was passed to changeQuantity (the quantity of the input box from Cart component).
        //     //unary plus will convert to number. quantity from input box is string
        //   }
        // }
        // else {
        //   return item//if current iteration item in cart is not the book that we changed quantity of just return the item
        // }
      )
    );
  }

  function removeItem(item) {//function to remove books from cart
    setCart(cart.filter(book => book.id !== item.id))//go through cart and check each book's id. If book.id matches the item.id that we passed to the function (item is a specific book from Cart.jsx) then we do not keep it. Keep every book in the cart that does not match the item that we passed
    console.log('removeItem', item)
  }

  function numberOfItems() {//count number of items and quantities in cart to update cart counter
    let counter = 0;
    cart.forEach(item => {//go through each item element (each book) in cart
      counter += item.quantity//add the quantity of each item element (book) in cart
    })
    return counter;
  }

  //Used to log cart for testing purposes. Rerenders component every time cart changes which will console.log(cart). Putting console.log(cart) in function addToCart() will not work well since function is asynchronous. console.log will happen before setCart is done?
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        {/* use components and Routes*/}
        <Nav numberOfItems={numberOfItems()}/>
        {/* Need parentheses for numberOfItems because "Functions are not valid as React child". Wihtout parentheses we are just passing the function wihtout executing it. This is OK in the case of addToCart because in the child component we pass arguments to addToCart and execute it from there. Here, we are not passing arguments to numberOfItems to execute in the Nav component. We want the return value from numberOfItems and use that return value in Nav component.*/}
        <Route path="/" exact component={Home} />
        {/* path specifies the url that the component loads on. So if path="/books", going to localhost:3000/books would load Home component.*/}
        {/* without exact, path="/" would make localhost:3000/books show Home. Because the "/" matches the "/" in "/books". Any url in a "lower level" than the "/" will still lead to Home */}

        <Route path="/books" exact render={() => <Books books={books} />} />
        {/* Can pass books data as prop. Change component to render and use arrow function. Now can send props to component in route */}
        {/* <Route path="/books" component={Books} /> */}

        <Route
          path="/books/:id"
          render={() => (
            <BookInfo books={books} addToCart={addToCart} cart={cart} />
          )}
        />
        {/* Dynamic route for when we click on a book. Uses colon (:id) */}
        {/* pass addToCart function as prop for button functionality */}

        <Route
          path="/cart"
          render={() => (
            <Cart 
            books={books} 
            cart={cart} 
            changeQuantity={changeQuantity}
            removeItem={removeItem} />
          )}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
