import "./App.css";
import React from "react";
import Header from "./component/Header";
import Product from "./component/ProductList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductDetails from "./component/ProductDetails";
import ContextProvider from "./Context/index";
import MyFavourite from "./component/MyFavourite";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ContextProvider>
          <Header>
            <Routes>
              {/* This is the Home page(initial load) */}
              <Route path="/" exact element={<Product />} />
              {/* Once user select any product it's redirect to Product details page*/}
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/myfavourites" element={<MyFavourite />} />
            </Routes>
          </Header>
        </ContextProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
