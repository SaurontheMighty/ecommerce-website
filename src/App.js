import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from "./components/Checkout";
import Success from "./components/checkout/Success";
import { useState } from "react";

function App() {

  const [cart, setCart] = useState([]);

  function addToCart(id) {
    setCart(cart => [...cart, id])
  }

  return (
    <Router>
      <div className="App">
        <Header cart={cart}></Header>
        <Switch>
          <Route exact path="/">
            <Home addToCart={addToCart} />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/thankyou">
            <Success />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
