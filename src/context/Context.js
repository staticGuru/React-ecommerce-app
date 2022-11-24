import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();


const Context = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
  
    byRating: 0,
    searchQuery: "",
    pagination:{skip:0,total:0},
    category:{value:-1,label:'select the category'},
  });


  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
