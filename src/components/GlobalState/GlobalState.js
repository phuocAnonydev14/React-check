import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { AppContext } from "../../App";

export function useShoppingCart() {
  return useContext(GlobalContext);
}

export const GlobalContext = createContext();
let listShoppingCart = [[], [], [], [], [], [], []];

function GlobalState({ children }) {
  const { isLoggedIn } = useContext(AppContext);
  let idUser = isLoggedIn.account.id;

  const [numberShoppingCart, setNumberShoppingCart] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  const getLocalStorage = () => {
    let dataShoppingCart2 = JSON.parse(
      localStorage.getItem(`shoppingCart${idUser}`)
    );
    if (dataShoppingCart2) {
      setShoppingCart(dataShoppingCart2);
      setNumberShoppingCart(listShoppingCart[idUser].length);
      console.log(numberShoppingCart);
    }
  };

  const addShoppingCart = (item) => {
    // console.log(item);
    let dataShoppingCart = JSON.parse(
      localStorage.getItem(`shoppingCart${idUser}`)
    );
    if (dataShoppingCart) listShoppingCart[idUser] = dataShoppingCart;
    else listShoppingCart[idUser] = [];
    listShoppingCart[idUser].push(item);
    localStorage.setItem(
      `shoppingCart${idUser}`,
      JSON.stringify(listShoppingCart[idUser])
    );
    getLocalStorage();
  };

  const addQuantityShoppingCart = (id, index) => {
    let dataShoppingCart = JSON.parse(
      localStorage.getItem(`shoppingCart${idUser}`)
    );
    if (dataShoppingCart) listShoppingCart[idUser] = dataShoppingCart;
    else listShoppingCart[idUser] = [];

    let obj = listShoppingCart[idUser].find((item) => item.id === id);
    obj.amount++;
    listShoppingCart[idUser][index] = obj;
    localStorage.setItem(
      `shoppingCart${idUser}`,
      JSON.stringify(listShoppingCart[idUser])
    );
    getLocalStorage();
  };

  useEffect(() => {
    let dataShoppingCart = JSON.parse(
      localStorage.getItem(`shoppingCart${idUser}`)
    );
    if (dataShoppingCart) {
      setShoppingCart(dataShoppingCart);
      setNumberShoppingCart(shoppingCart.length);
    }
  }, [idUser, shoppingCart.length]);

  return (
    <GlobalContext.Provider
      value={{
        addShoppingCart,
        idUser,
        listShoppingCart,
        numberShoppingCart,
        shoppingCart,
        addQuantityShoppingCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
