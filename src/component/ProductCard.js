import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Context } from "../Context/index";
import Tooltip from "@mui/material/Tooltip";

const ProductCard = ({ item }) => {
  const { favlist, onFavItemAdd, login } = useContext(Context);

  const navigate = useNavigate();
  const onClickCard = (item, evt) => {
    evt.preventDefault();
    navigate(`/product/${item.id}`);
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
  return (
    <div className="product_card" onClick={onClickCard.bind(this, item)}>
      <img
        src={item.image}
        width="100%"
        alt={item.title}
        height={"250px"}
        style={{ borderRadius: "15px" }}
      />
      {favlist.includes(item.id) ? (
        <FavoriteOutlinedIcon
          onClick={onDeselectFav.bind(this, item)}
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
            onClick={onSelectFav.bind(this, item)}
            style={{ position: "absolute", top: "10", right: "10" }}
          />
        </Tooltip>
      )}

      <p style={{ padding: "0 10px", lineHeight: "2" }}>{item.title}</p>
      <Rating rating={item.rating.rate} />
      <h5 style={{ padding: "0 10px", fontSize: "1.35rem" }}>
        &#8377;{item.price}
      </h5>
    </div>
  );
};

export default ProductCard;
