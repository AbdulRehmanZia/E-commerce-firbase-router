import { Children, createContext, useEffect, useState } from "react";

const CardContext = createContext();

function CardContextProvider({ children }) {
  const [cartItems, SetCartItems] = useState([]);

  useEffect(() => {
    const itmes = localStorage.getItem("cartItem");
    if (itmes) {
      SetCartItems([...JSON.parse(cartItems)]); //Pehli baar component render hone par local storage se cart items load
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems)); //Jab bhi cartItems mein change hon, unhe local storage me save
  }, [cartItems]);

  //1st Function
  function addItemsToCart(item) {
    const arr = cartItems;
    const productIndex = cartItems.findIndex((data) => data.id == item.id); //Either True will save or False
    if (productIndex !== -1) {
      arr.push(item); //Agar User ne add nhi kiya howa tw add krdo
    } else {
      arr[productIndex].quatity++; //Yahan pe humne already existed product ki quantity increament kri
    }
    SetCartItems(...arr);
  }
  //2nd Function
  function removeItemsFromCart(id) {
    const productIndex = cartItems.findIndex((id) => data.id == id);
    arr.splice(productIndex, 1);
    SetCartItems(...arr);
  }
  //3rd Function
  function isItemAdded(id) {
    const productIndex = cartItems.findIndex((data) => data.id == id);
    if (productIndex !== -1) {
      return cartItems[productIndex];
    } else {
      return null;
    }
  }

  return (
    <CardContext.Provider
      value={{
        cartItems,
        addItemsToCart,
        removeItemsFromCart,
        isItemAdded,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
