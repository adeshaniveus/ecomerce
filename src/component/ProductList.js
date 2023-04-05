import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data";
const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getProduct = async () => {
    setIsLoading(true);
    setProduct(products);
    setIsLoading(false);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="product_container">
      {!isLoading ? (
        product &&
        product.map((item, idx) => {
          return <ProductCard item={item} key={`${item.title}${item.price}`} />;
        })
      ) : (
        <div class="loader"></div>
      )}
    </div>
  );
};

export default ProductList;
