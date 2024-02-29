import React, { createContext, useEffect, useState } from "react";

let cartContext = createContext();

export default function MainContext({ children }) {
  let oldData = JSON.parse(localStorage.getItem("CART")) ?? [];

  let [carts, setCarts] = useState(oldData);
  let cartData = {
    carts,
    setCarts,
  };

  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(carts));
  }, [carts]);

  return (
    <cartContext.Provider value={cartData}>{children}</cartContext.Provider>
  );
}

export { cartContext };
