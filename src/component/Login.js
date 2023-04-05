import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import logo from "../assets/logo.png";
import { users } from "../data";
import { Context } from "../Context";

const Login = ({
  fullWidth,
  maxWidth,
  open,
  handleClose,
  setLogin,
  callfrom,
}) => {
  const [userInputDetail, setUserInputDetail] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { onSetCartCount, onLogin } = useContext(Context);

  const onInputChange = (evt) => {
    setUserInputDetail((prv) => ({
      ...prv,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onSubmitForm = () => {
    if (
      userInputDetail &&
      userInputDetail["username"] &&
      userInputDetail["password"]
    ) {
      const logedinUser = users.filter(
        (user) =>
          user.username === userInputDetail.username &&
          user.password === userInputDetail.password
      );
      if (logedinUser.length > 0) {
        localStorage.setItem("login", true);
        localStorage.setItem("user", JSON.stringify(logedinUser[0]));
        JSON.stringify([]);
        if (callfrom !== "checkoutPage") onSetCartCount([]);
        onLogin(true);
        onCloseDialog();
      } else {
        setErrorMessage("Username or Password is incorrect");
      }
    } else {
      setErrorMessage("Please Enter username and password");
    }
  };

  const onCloseDialog = () => {
    setErrorMessage(null);
    setUserInputDetail(null);
    handleClose();
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle style={{ backgroundColor: "beige" }}>Login</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8} className="loginLeft">
              <img src={logo} alt={"logo"} loading="lazy" height={"250px"} />
            </Grid>
            <Grid item xs={8} className="loginRight">
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="username"
                label="Username"
                required
                onChange={onInputChange}
                autoComplete={"off"}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                required
                onChange={onInputChange}
                autoComplete={"off"}
              />
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <Button onClick={onCloseDialog}>Cancel</Button>

              <Button
                onClick={onSubmitForm}
                style={{ backgroundColor: "blueviolet", color: "white" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
