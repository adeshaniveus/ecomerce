import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import Carousel from "./Carousel";
import { Context } from "../Context/index";
import { products } from "../data";
import Rating from "./Rating";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BuyNow from "./Buynow";

const ProductDetails = () => {
  const { id } = useParams();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const { cartItem, onSetCartCount, login, favlist, onFavItemAdd } =
    useContext(Context);

  const getProductDetail = async (id) => {
    setIsLoading(true);
    setData(products[id - 1]);
    setProductList(products);
    setIsLoading(false);
  };
  const onAddingToCard = (item) => {
    let temp = [];
    if (cartItem) temp = [...cartItem];
    temp.push(item.id);
    onSetCartCount(temp);
  };

  const onSelectFav = (item, evt) => {
    evt.stopPropagation();
    if (login) {
      let temp = [];
      if (favlist) temp = [...favlist];
      temp.push(item.id);
      onFavItemAdd(temp);
    }
  };

  const onDeselectFav = (item, evt) => {
    evt.stopPropagation();
    let temp = [];
    if (favlist) temp = favlist.filter((val) => val !== item.id);
    onFavItemAdd(temp);
  };
  const onBuynow = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (id) {
      getProductDetail(id);
    }
  }, [id]);

  return (
    <>
      <div className="product_detial_card">
        {!isLoading && data ? (
          <>
            <div className="leftside">
              <img
                src={data.image}
                alt={data.title}
                width="100%"
                height={"100%"}
              />
              {favlist.includes(data.id) ? (
                <FavoriteOutlinedIcon
                  onClick={onDeselectFav.bind(this, data)}
                  style={{
                    position: "absolute",
                    top: "10",
                    right: "10",
                    color: "orange",
                  }}
                />
              ) : (
                <Tooltip title={login ? null : "Please login"}>
                  <FavoriteBorderOutlinedIcon
                    onClick={onSelectFav.bind(this, data)}
                    style={{ position: "absolute", top: "10", right: "10" }}
                  />
                </Tooltip>
              )}
            </div>
            <div className="rightside">
              <p style={{ padding: "10px", fontSize: "1.5rem" }}>
                {data.title}
              </p>
              <Rating rating={data.rating.rate} />
              <h5 style={{ padding: "0 10px", fontSize: "1.35rem" }}>
                &#8377;{data.price}
              </h5>
              <p
                style={{
                  padding: "0 10px",
                  fontSize: "1rem",
                  textAlign: "justify",
                  lineHeight: "1.5rem",
                  color: "#837b7b",
                }}
              >
                {data.description}
              </p>
              {!cartItem.includes(data.id) && (
                <button onClick={onAddingToCard.bind(this, data)}>
                  <BsFillCartCheckFill
                    width={50}
                    height={50}
                    style={{ marginRight: "10px" }}
                  />
                  Add to Cart
                </button>
              )}

              <button onClick={onBuynow}>Buy Now</button>
            </div>
          </>
        ) : (
          <div className="loader"></div>
        )}
      </div>
      {open && <BuyNow open={open} setOpen={setOpen} id={id} />}

      <Carousel data={productList} />
    </>
  );
};

export default ProductDetails;
