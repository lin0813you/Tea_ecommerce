
import { useState, useEffect, useCallback } from 'react';

const getCartItemsFromStorage = () => {
  try {
    const items = localStorage.getItem('cart');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error parsing cart items from localStorage:", error);
    return [];
  }
};

// Helper function to save cart items to localStorage and dispatch event
const setCartItemsToStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
  // Dispatch a custom event to notify all useCart instances about cart updates
  window.dispatchEvent(new CustomEvent('cartUpdated')); 
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState(getCartItemsFromStorage());

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const addToCart = useCallback((product, quantity, customization) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.id === product.id && 
          JSON.stringify(item.customization) === JSON.stringify(customization)
      );
      let newItems;
      if (existingItemIndex !== -1) {
        newItems = prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { 
          ...product, 
          cartItemId: `${product.id}_${Date.now()}`,
          quantity, 
          customization 
        }];
      }
      setCartItemsToStorage(newItems); // This will now also dispatch 'cartUpdated'
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((cartItemId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.cartItemId !== cartItemId);
      setCartItemsToStorage(newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCartItems(prevItems => {
        const newItems = prevItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItemsToStorage(newItems);
        return newItems;
      });
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartItemsToStorage([]);
  }, []);

  useEffect(() => {
    // Handler for storage events (cross-tab synchronization)
    const handleStorageChange = (event) => {
      if (event.key === 'cart') {
        setCartItems(getCartItemsFromStorage());
      }
    };

    // Handler for our custom 'cartUpdated' event (intra-tab synchronization assurance)
    const handleCartUpdatedEvent = () => {
      // Wrap in setTimeout to avoid issues with updates during render
      setTimeout(() => {
        setCartItems(getCartItemsFromStorage());
      }, 0);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdatedEvent); // Listen for cart updates

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdatedEvent);
    };
  }, []); // Empty dependency array ensures this effect runs once for setup/cleanup

  return { cartItems, cartCount, addToCart, removeFromCart, updateQuantity, clearCart };
};
