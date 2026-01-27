import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Get user-specific cart key
  const getCartKey = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return `cartItems_${user._id || user.email}`; // Use user ID or email as unique identifier
    }
    return 'cartItems_guest'; // Fallback for non-logged-in users
  };

  const [cartItems, setCartItems] = useState(() => {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cartItems changes
  React.useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
