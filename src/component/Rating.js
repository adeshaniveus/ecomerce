import React from "react";

const Rating = ({ rating }) => {
  return (
    <div style={{ padding: "0 10px" }}>
      <span className={`fa fa-star ${rating > 0.5 ? "checked" : null}`}></span>
      <span className={`fa fa-star ${rating > 1.5 ? "checked" : null}`}></span>
      <span className={`fa fa-star ${rating > 2.5 ? "checked" : null}`}></span>
      <span className={`fa fa-star ${rating > 3.5 ? "checked" : null}`}></span>
      <span className={`fa fa-star ${rating > 4.5 ? "checked" : null}`}></span>
      <span
        style={{
          marginLeft: "20px",
          backgroundColor: "lightseagreen",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {rating} of 5
      </span>
    </div>
  );
};

export default Rating;
