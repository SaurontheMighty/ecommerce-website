import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from "./components/Checkout";
import Success from "./components/checkout/Success";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home />
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
