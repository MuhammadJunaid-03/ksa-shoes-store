"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useInventory } from '@/context/InventoryContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, toastMessage, cartCount } = useCart();
  const { getStock } = useInventory();
  const { t } = useLanguage();
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`${styles.toast} ${styles.toastVisible} ${toastMessage.type === 'error' ? styles.toastError : ''}`}>
          {toastMessage.type === 'error' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          )}
          {toastMessage.msg}
        </div>
      )}

      {/* Cart Overlay Background */}
      <div 
        className={`${styles.overlay} ${cartOpen ? styles.overlayOpen : ''}`} 
        onClick={toggleCart}
      />
      
      {/* Sliding Drawer */}
      <div className={`${styles.drawer} ${cartOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <h2>{t('yourCart')} ({cartCount})</h2>
          <button className={styles.closeBtn} onClick={toggleCart}>✕</button>
        </div>
        
        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p>{t('emptyCart')}</p>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cartItems.map(item => {
                const remainingStock = getStock(item.id, item.selectedSize, item.selectedColor);
                const maxQty = item.quantity + remainingStock;

                return (
                  <li key={item.cartKey} className={styles.cartItem}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemMeta}>{item.selectedColor} · EU {item.selectedSize}</p>
                      
                      <div className={styles.qtyPriceRow}>
                        {/* Quantity Controls */}
                        <div className={styles.qtyControls}>
                          <button 
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className={styles.qtyValue}>{item.quantity}</span>
                          <button 
                            className={`${styles.qtyBtn} ${item.quantity >= maxQty ? styles.qtyBtnDisabled : ''}`}
                            onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                            disabled={item.quantity >= maxQty}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className={styles.itemPrice}>{item.currency} {item.price * item.quantity}</span>
                      </div>

                      {/* Stock warning in cart */}
                      {remainingStock <= 2 && remainingStock > 0 && (
                        <span className={styles.cartStockWarn}>Only {remainingStock} more available</span>
                      )}
                      {remainingStock === 0 && (
                        <span className={styles.cartStockMax}>Max quantity reached</span>
                      )}
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.cartKey)} aria-label="Remove item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>{t('subtotal')}</span>
              <span className={styles.subtotalPrice}>SAR {subtotal}</span>
            </div>
            <p className={styles.taxNote}>{t('taxNote')}</p>
            <button className={styles.checkoutBtn} onClick={() => alert("Checkout flow mock")}>{t('checkout')}</button>
          </div>
        )}
      </div>
    </>
  );
}
