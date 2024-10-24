import React, {createContext, useContext, useState} from 'react';
import {Text} from 'react-native';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = product => {
    setCartItems(currentItems => {
      // Check if the item is already in the cart
      const itemIndex = currentItems.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        // If so, update the quantity
        const updatedItems = [...currentItems];
        updatedItems[itemIndex].quantity =
          (updatedItems[itemIndex].quantity || 1) + 1;
        return updatedItems;
      } else {
        // Otherwise, add the new item
        return [...currentItems, {...product, quantity: 1}];
      }
    });
  };

  const onRemove = productId => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== productId),
    );
  };

  const onIncrease = product => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const onDecrease = product => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === product.id
          ? {...item, quantity: Math.max(item.quantity - 1, 1)}
          : item,
      ),
    );
  };

  const totalAmount = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0); // Starting value of the accumulator is 0

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        setCartItems,
        onRemove,
        onIncrease,
        onDecrease,
        totalAmount,
        totalItems
      }}>
      {/* <Text style={{marginTop: 100}}>dsfsdf {totalAmount}</Text> */}
      {children}
    </CartContext.Provider>
  );
};
