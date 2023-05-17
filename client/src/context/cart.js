import { useState,  useContext, createContext, useEffect } from "react";

// create a gloabal context for the user
const CartContext = createContext();

// create a provider for the context
const CartProvider = ({ children }) => {
  // state variable to store the user data
  const [cart, setCart] = useState([]);
useEffect(() => {
  let exisitingCartItem = localStorage.getItem("cart");
if(exisitingCartItem) setCart(JSON.parse(exisitingCartItem));
}, [])


  return (
    // return the context provider with the state variable and the function to update the state variable
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
// create a custom hook to use the context
const useCart = () => {
  // return the context
  return useContext(CartContext);
};

export { useCart, CartProvider };
 