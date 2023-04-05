import React, { useState, useEffect, useContext } from "react";
import { products } from "../data";
import ProductCard from "./ProductCard";
import { Context } from "../Context/index";

const MyFavourite = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { favlist } = useContext(Context);
  const getProduct = async () => {
    setIsLoading(true);
    setProduct(products);
    setIsLoading(false);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {" "}
      <div>
        <h2 style={{ marginLeft: "15%" }}>Favourites</h2>
      </div>
      <div className="product_container">
        {!isLoading ? (
          product &&
          product.map((item, idx) => {
            let present = favlist.includes(item.id);
            return present ? (
              <ProductCard item={item} key={`${item.title}${item.price}`} />
            ) : null;
          })
        ) : (
          <div class="loader"></div>
        )}
      </div>
    </>
  );
};

export default MyFavourite;
