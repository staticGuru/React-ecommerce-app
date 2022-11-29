import "./App.css";
import React, { Suspense } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
const Home = React.lazy(() => import("./components/Home"));
const Cart =React.lazy(() => import("./components/Cart"));
const ProductDetail = React.lazy(() => import("./components/ProductDetail"));



function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Route path="/" exact>
        <Suspense fallback={<div>Loading</div>}>
          <Home />
          </Suspense>
        </Route>
        <Route path="/cart">
        <Suspense fallback={<div>Loading</div>}>
          <Cart />
          </Suspense>
        </Route>
        <Route path="/product/:id">
        <Suspense fallback={<div>Loading</div>}>
          <ProductDetail />
          </Suspense>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
