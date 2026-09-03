"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);
 // Create a unique identity for a cart item
  // Product + Size + Color = one cart variant
  export const getCartItemKey = (product) => {
    return [
      product.id,
      product.size || "",
      product.color || "",
    ].join("|");
  };


export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage after component mounts
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");

      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, isHydrated]);

 
  // Add product / variant to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const productKey = getCartItemKey(product);

      const existingItem = prevItems.find(
        (item) => getCartItemKey(item) === productKey
      );

      // If same product + size + color already exists
      // increase its quantity
      if (existingItem) {
        return prevItems.map((item) =>
          getCartItemKey(item) === productKey
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Otherwise create a new cart item
      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Decrease quantity of a specific variant
  const decreaseQuantity = (product) => {
    setCartItems((prevItems) => {
      const productKey = getCartItemKey(product);

      const existingItem = prevItems.find(
        (item) => getCartItemKey(item) === productKey
      );

      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          getCartItemKey(item) === productKey
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        );
      }

      // Remove when quantity reaches 0
      return prevItems.filter(
        (item) => getCartItemKey(item) !== productKey
      );
    });
  };

  // Completely remove a specific variant
  const removeFromCart = (product) => {
    setCartItems((prevItems) => {
      const productKey = getCartItemKey(product);

      return prevItems.filter(
        (item) => getCartItemKey(item) !== productKey
      );
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}