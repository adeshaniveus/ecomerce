import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import "font-awesome/css/font-awesome.min.css";
import "../index.css";
import { Context } from "../Context/index";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import UserDropDown from "./UserDropDown";
import CheckOut from "./CheckOut";

const Header = ({ children }) => {
  const { cartItem, onSetCartCount, login, onLogin } = useContext(Context);
  const [openDialog, setOpendialog] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const onLoginClick = () => {
    setOpendialog(true);
  };

  const onCloseDialog = () => {
    setOpendialog(false);
  };

  const onLogout = () => {
    localStorage.setItem("login", false);
    localStorage.setItem("user", null);
    localStorage.setItem("cardItem", JSON.stringify([]));
    onSetCartCount([]);
    onLogin(false);
  };

  const onNavigate = () => {
    navigate("/");
  };

  const onOpenCheckout = () => {
    setOpen(true);
  };

  return (
    <>
      <nav className="navbar">
        <img
          src={logo}
          alt="logo"
          width={"75"}
          height={"75"}
          style={{ marginLeft: "20px", cursor: "pointer" }}
          onClick={onNavigate.bind(this)}
        />
        <div className="centerAlign">
          <input
            type={"text"}
            placeholder="Search for Product,brands and more."
          />
          <AiOutlineSearch className="searchIcon" />
        </div>
        <div className="rightAlign">
          <span
            style={{ position: "relative", cursor: "pointer" }}
            onClick={onOpenCheckout.bind(this)}
          >
            {" "}
            <BsFillCartCheckFill
              width={50}
              height={50}
              style={{ marginRight: "10px" }}
            />
            Cart
            {cartItem.length > 0 ? (
              <span
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  padding: "5px 7px",
                }}
              >
                {" "}
                {cartItem.length}{" "}
              </span>
            ) : null}
          </span>
          {login ? (
            <UserDropDown onLogout={onLogout} />
          ) : (
            <button onClick={onLoginClick.bind(this)} className="login">
              Login
            </button>
          )}

          <Login open={openDialog} handleClose={onCloseDialog} />
          <CheckOut open={open} setOpen={setOpen} />
        </div>
      </nav>
      {children}
    </>
  );
};

export default Header;
