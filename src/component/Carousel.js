import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const Carousel = ({ data }) => {
  const navigate = useNavigate();
  const onClickCard = (item) => {
    navigate(`/product/${item.id}`);
  };
  return (
    <div className="carousel-container" id="custom-scroll">
      {" "}
      {data &&
        data.map((item, idx) => {
          return (
            <div
              style={{
                width: "20%",
                height: "80%",
                display: "flex",
                flex: "0 0 auto",
                margin: "10px",
                flexDirection: "column",
                cursor: "pointer",
              }}
              key={`${item.id}`}
              onClick={onClickCard.bind(this, item)}
            >
              <img
                src={item.image}
                alt={item.title}
                width="100%"
                height={"70%"}
              />
              <p
                style={{
                  width: "100%",
                  fontSize: "0.8rem",
                  textAlign: "justify",
                }}
              >
                {item.title}
              </p>
              <Rating rating={item.rating.rate} />
              <p style={{ fontSize: "1.35rem" }}>&#8377;{item.price}</p>
            </div>
          );
        })}
    </div>
  );
};

export default memo(Carousel);
