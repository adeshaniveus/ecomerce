import React from "react";
import { Button } from "@mui/material";

const Address = ({ user, onConfrm, handleClose }) => {
  return (
    <>
      <h2>Billing Address</h2>
      <h4>{`${user.firstName} ${user.lastName}`}</h4>
      <p>{user.mobile}</p>
      <p>{user.email}</p>
      <p>{user.address.line1}</p>
      <p>{user.address.line2}</p>
      <p>
        {`${user.address.city},${user.address.state},${user.address.pincode}`}
      </p>

      <h5 className="cash_delivery">
        <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
        Cash on Delivery
      </h5>
      <div>
        <Button variant="contained" onClick={onConfrm}>
          Confirm
        </Button>
        <Button variant="outlnied" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default Address;
