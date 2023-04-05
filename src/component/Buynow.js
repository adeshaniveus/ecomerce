import React, { useContext, useState, useEffect } from "react";
import { Context } from "../Context/index";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { products } from "../data";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Login from "./Login";
import SignUp from "./Signup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const BuyNow = ({ open, setOpen, id }) => {
  let total = 0;
  const [thankyouDialog, setThankyouDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openGuestDialog, setOpenGuestDialog] = useState(false);
  const [proceedAs, setProceedAs] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [visibleAddress, setvisibleAdress] = useState(false);
  const [enableNextPage, setEnableNextPage] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    setThankyouDialog(false);
    setOpenLoginDialog(false);
    setvisibleAdress(false);
    setOpenGuestDialog(false);
    setEnableNextPage(false);
  };

  const { onSetCartCount, login } = useContext(Context);
  const onPlaceOrder = () => {
    setEnableNextPage(true);
  };

  const onConfrm = () => {
    setThankyouDialog(true);
  };

  const onCloseThankyouDialog = () => {
    setvisibleAdress(false);
    setEnableNextPage(false);
    setOpen(false);
    setThankyouDialog(false);
    navigate("/");
    onSetCartCount([]);
  };

  const onChangeProceedType = (evt, value) => {
    setProceedAs(value);
    if (value === "login") {
      setOpenLoginDialog(true);
      setOpenGuestDialog(false);
    }

    if (value === "guest") {
      setOpenLoginDialog(false);
      setOpenGuestDialog(true);
    }
  };

  const onCloseDialog = () => {
    setOpenLoginDialog(false);
    setOpenGuestDialog(false);
  };

  const onCloseSignup = () => {
    setvisibleAdress(true);
    setOpenLoginDialog(false);
    setOpenGuestDialog(false);
  };

  useEffect(() => {
    setDataSource([Number(id)]);
  }, [id]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: "50%" }}>
        <h2 id="parent-modal-title">Cart</h2>
        {dataSource.length > 0 ? (
          dataSource.map((id) => {
            let filter = products.filter((data) => data.id === id);
            total = Number(total) + Number(filter[0]?.price);
            return (
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid #b5acac",
                  display: "flex",
                  flexDirection: "row",
                  padding: "10px",
                }}
              >
                <div style={{ width: "25%" }}>
                  <img
                    src={filter[0]?.image}
                    alt={filter[0]?.title}
                    width={200}
                  />
                  <div>{filter[0]?.title}</div>
                </div>
                <div
                  style={{
                    width: "25%",
                    textAlign: "center",
                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  &#8377;{filter[0]?.price}
                </div>
                <div
                  style={{
                    width: "25%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Qty:1
                </div>
              </div>
            );
          })
        ) : (
          <p id="parent-modal-description">
            Sorry! No Product availabel in cart
          </p>
        )}
        {total > 0 && (
          <>
            <div
              style={{
                textAlign: "right",
                marginTop: "20px",
                textDecoration: "underline",
                textDecorationStyle: "double",
                padding: "10px",
                fontSize: "1.5rem",
              }}
            >
              Total: &#8377;{total}
            </div>
            <Button variant="contained" onClick={onPlaceOrder}>
              Place Order
            </Button>
          </>
        )}
        {enableNextPage && dataSource.length > 0 && (
          <>
            {login ? (
              <>
                <Address
                  user={user}
                  onConfrm={onConfrm}
                  handleClose={handleClose}
                />
              </>
            ) : (
              <>
                <div style={{ marginTop: "20px" }}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Proceed As
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={onChangeProceedType.bind(this)}
                    >
                      <FormControlLabel
                        value="guest"
                        control={<Radio />}
                        label="Guest"
                      />
                      <FormControlLabel
                        value="login"
                        control={<Radio />}
                        label="Login"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </>
            )}
          </>
        )}
        {proceedAs === "login" && (
          <Login
            open={openLoginDialog}
            handleClose={onCloseDialog}
            callfrom={"checkoutPage"}
          />
        )}
        {proceedAs === "guest" && (
          <SignUp
            open={openGuestDialog}
            handleClose={onCloseDialog}
            onSubmitForm={onCloseSignup}
          />
        )}
        {proceedAs === "guest" && visibleAddress && dataSource.length > 0 && (
          <Address user={user} onConfrm={onConfrm} handleClose={handleClose} />
        )}
        <Dialog
          onClose={onCloseThankyouDialog}
          open={thankyouDialog}
          style={{ padding: "20px" }}
        >
          <DialogTitle>Thank you !</DialogTitle>
          <h5 style={{ padding: "20px" }}>Order Successfull Placed</h5>

          <Button onClick={onCloseThankyouDialog} variant="outlined">
            Cancel
          </Button>
        </Dialog>
      </Box>
    </Modal>
  );
};

export default BuyNow;
