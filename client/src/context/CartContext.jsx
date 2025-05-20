// client/src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, customization) => {
    setCartItems(prevItems => {
      // Check if item with same ID and exact customization already exists
      // For simplicity, we'll assume each added item is unique for now
      // Or, you could generate a unique ID for each cart item instance
      const newItem = { 
        ...product, 
        ...customization, 
        cartItemId: Date.now() // Simple unique ID for this instance in cart
      };
      console.log('Adding to cart (context):', newItem);
      return [...prevItems, newItem];
    });
  };

  // Later, you can add functions like removeFromCart, updateQuantity, etc.

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
