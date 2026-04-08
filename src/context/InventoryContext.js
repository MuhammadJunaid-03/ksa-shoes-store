"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { products as initialProducts } from '@/data/products';

const InventoryContext = createContext();

// Build initial stock map: { "productId-size-color": quantity }
function buildStockMap(products) {
  const map = {};
  products.forEach(product => {
    product.variants.forEach(v => {
      const key = `${product.id}-${v.size}-${v.color}`;
      map[key] = v.stock;
    });
  });
  return map;
}

export function InventoryProvider({ children }) {
  const [stockMap, setStockMap] = useState(() => buildStockMap(initialProducts));

  // Get stock for a specific variant
  const getStock = useCallback((productId, size, color) => {
    return stockMap[`${productId}-${size}-${color}`] ?? 0;
  }, [stockMap]);

  // Get total stock for a product across all variants
  const getTotalStock = useCallback((productId) => {
    let total = 0;
    Object.entries(stockMap).forEach(([key, qty]) => {
      if (key.startsWith(`${productId}-`)) {
        total += qty;
      }
    });
    return total;
  }, [stockMap]);

  // Get lowest stock variant that's still in stock (for "Only X left" on card)
  const getLowestStock = useCallback((productId) => {
    let lowest = Infinity;
    Object.entries(stockMap).forEach(([key, qty]) => {
      if (key.startsWith(`${productId}-`) && qty > 0 && qty < lowest) {
        lowest = qty;
      }
    });
    return lowest === Infinity ? 0 : lowest;
  }, [stockMap]);

  // Check if any variant is in stock
  const isInStock = useCallback((productId) => {
    return getTotalStock(productId) > 0;
  }, [getTotalStock]);

  // Check if product has low stock (any variant <= 3)
  const hasLowStock = useCallback((productId) => {
    let hasLow = false;
    let hasAny = false;
    Object.entries(stockMap).forEach(([key, qty]) => {
      if (key.startsWith(`${productId}-`)) {
        if (qty > 0) hasAny = true;
        if (qty > 0 && qty <= 3) hasLow = true;
      }
    });
    return hasAny && hasLow;
  }, [stockMap]);

  // Decrease stock (called when adding to cart)
  const decreaseStock = useCallback((productId, size, color, quantity = 1) => {
    const key = `${productId}-${size}-${color}`;
    setStockMap(prev => {
      const current = prev[key] ?? 0;
      if (current < quantity) return prev;
      return { ...prev, [key]: current - quantity };
    });
  }, []);

  // Increase stock (called when removing from cart)
  const increaseStock = useCallback((productId, size, color, quantity = 1) => {
    const key = `${productId}-${size}-${color}`;
    setStockMap(prev => {
      return { ...prev, [key]: (prev[key] ?? 0) + quantity };
    });
  }, []);

  // Get available sizes for a product + color (sizes with stock > 0)
  const getAvailableSizes = useCallback((productId, color) => {
    const available = [];
    Object.entries(stockMap).forEach(([key, qty]) => {
      if (key.startsWith(`${productId}-`) && key.endsWith(`-${color}`) && qty > 0) {
        const parts = key.split('-');
        available.push(parseInt(parts[1]));
      }
    });
    return available.sort((a, b) => a - b);
  }, [stockMap]);

  return (
    <InventoryContext.Provider value={{
      getStock, getTotalStock, getLowestStock, isInStock, hasLowStock,
      decreaseStock, increaseStock, getAvailableSizes
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
