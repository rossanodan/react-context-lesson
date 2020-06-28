import { createContext } from "react";

const CartContex = createContext({
  hidden: true,
  toggleHidden: () => {},
});

export default CartContex;
