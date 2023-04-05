import React, { createContext, useState, useEffect } from "react";

export const Context = createContext("default");
const ContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [favlist, setFavlist] = useState([]);
  const [login, setLogin] = useState(false);
  const onSetCartCount = (value) => {
    localStorage.setItem("cardItem", JSON.stringify(value));
    setCartItem(value);
  };

  const onFavItemAdd = (value) => {
    localStorage.setItem("favlist", JSON.stringify(value));
    setFavlist(value);
  };

  const onLogin = (boolean) => {
    setLogin(boolean);
  };
  useEffect(() => {
    const cardItem = JSON.parse(localStorage.getItem("cardItem"));
    const favlist = JSON.parse(localStorage.getItem("favlist"));
    const login = JSON.parse(localStorage.getItem("login"));
    if (login) {
      setLogin(login);
    }
    if (cardItem?.length > 0) {
      setCartItem(cardItem);
    }
    if (favlist?.length > 0) {
      setFavlist(favlist);
    }
  }, []);
  return (
    <Context.Provider
      value={{
        cartItem,
        onSetCartCount,
        favlist,
        onFavItemAdd,
        login,
        onLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
