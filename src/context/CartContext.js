"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useInventory } from './InventoryContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessageState] = useState(null);
  const { getStock, decreaseStock, increaseStock } = useInventory();

  const showToast = (msg, type = 'success') => {
    setToastMessageState({ msg, type });
    setTimeout(() => setToastMessageState(null), 3000);
  };

  const addToCart = useCallback((product, size, color) => {
    // Validate stock
    const available = getStock(product.id, size, color);
    const existingItem = cartItems.find(
      item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
    );
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;

    if (available <= 0) {
      showToast('This variant is out of stock', 'error');
      return false;
    }

    if (currentQtyInCart >= available) {
      showToast(`Only ${available} available in stock`, 'error');
      return false;
    }

    // Decrease inventory
    decreaseStock(product.id, size, color);

    setCartItems(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        ...product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
        cartKey: `${product.id}-${size}-${color}`
      }];
    });

    showToast(`${product.name} (${color}, EU ${size}) added to cart`);
    setCartOpen(true);
    return true;
  }, [cartItems, getStock, decreaseStock]);

  const removeFromCart = useCallback((cartKey) => {
    setCartItems(prev => {
      const item = prev.find(i => i.cartKey === cartKey);
      if (item) {
        // Return all quantity back to inventory
        increaseStock(item.id, item.selectedSize, item.selectedColor, item.quantity);
      }
      return prev.filter(i => i.cartKey !== cartKey);
    });
  }, [increaseStock]);

  const updateQuantity = useCallback((cartKey, newQuantity) => {
    setCartItems(prev => {
      const item = prev.find(i => i.cartKey === cartKey);
      if (!item) return prev;

      const diff = newQuantity - item.quantity;

      if (diff > 0) {
        // Adding more — check stock
        const available = getStock(item.id, item.selectedSize, item.selectedColor);
        if (available < diff) {
          showToast(`Only ${available} more available`, 'error');
          return prev;
        }
        decreaseStock(item.id, item.selectedSize, item.selectedColor, diff);
      } else if (diff < 0) {
        // Removing some — return to inventory
        increaseStock(item.id, item.selectedSize, item.selectedColor, Math.abs(diff));
      }

      if (newQuantity <= 0) {
        return prev.filter(i => i.cartKey !== cartKey);
      }

      return prev.map(i =>
        i.cartKey === cartKey ? { ...i, quantity: newQuantity } : i
      );
    });
  }, [getStock, decreaseStock, increaseStock]);

  const toggleCart = () => setCartOpen(!cartOpen);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartOpen, toggleCart, cartItems, addToCart, removeFromCart,
      updateQuantity, cartCount,
      toastMessage: toastMessage, setToastMessage: showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
