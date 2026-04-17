"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useInventory } from "@/context/InventoryContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();
  const { getStock } = useInventory();
  const { t } = useLanguage();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 200 ? 0 : 25;
  const total = subtotal + shippingCost;
  const installment = Math.ceil(total / 3);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

  /* ── Reusable style objects ── */
  const goldGradientText = {
    background: "var(--gold-text)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const cardStyle = {
    background: "var(--primary-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "2rem",
  };

  const qtyBtnStyle = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--primary-soft)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "var(--transition-fast)",
  };

  /* ── Empty Cart ── */
  if (cartItems.length === 0) {
    return (
      <div
        className="container"
        style={{
          paddingTop: "10rem",
          paddingBottom: "5rem",
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1"
            style={{ marginBottom: "1.5rem", opacity: 0.6 }}
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              marginBottom: "1rem",
              ...goldGradientText,
            }}
          >
            Your shopping bag is empty
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "400px",
              margin: "0 auto 2.5rem",
              lineHeight: "1.6",
            }}
          >
            Looks like you have not added anything yet. Explore our collection of premium handcrafted footwear.
          </p>
          <Link
            href="/sandals"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              background: "var(--gold-shimmer)",
              color: "var(--primary)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.85rem",
            }}
          >
            Discover Our Collection
          </Link>
        </div>
      </div>
    );
  }

  /* ── Cart with Items ── */
  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem", minHeight: "80vh" }}>
      {/* Scoped responsive styles */}
      <style>{`
        .az-cart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 900px) {
          .az-cart-grid {
            grid-template-columns: 1fr 380px;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div className="gold-divider" style={{ margin: "0 0 1.5rem" }}></div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            fontWeight: 600,
            ...goldGradientText,
          }}
        >
          Shopping Bag
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
          ({cartCount} {cartCount === 1 ? "item" : "items"})
        </p>
      </div>

      {/* 2-column layout */}
      <div className="az-cart-grid">
        {/* ── Cart Items Column ── */}
        <div>
          {cartItems.map((item, index) => {
            const remainingStock = getStock(item.id, item.selectedSize, item.selectedColor);
            const maxQty = item.quantity + remainingStock;

            return (
              <React.Fragment key={item.cartKey}>
                <div
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    padding: "1.5rem 0",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Product Image */}
                  <Link href={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        background: "var(--primary-card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Link>

                  {/* Item Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/product/${item.id}`}
                      style={{
                        textDecoration: "none",
                        color: "var(--text-primary)",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          marginBottom: "0.35rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </h3>
                    </Link>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.8rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Brand: {item.brand}
                    </p>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Color: {item.selectedColor} &nbsp;|&nbsp; Size: {item.selectedSize} (EU)
                    </p>
                    <p
                      style={{
                        color: "var(--gold)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        marginBottom: "0.85rem",
                      }}
                    >
                      {item.currency} {item.price * item.quantity}
                    </p>

                    {/* Qty + Remove row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      {/* Quantity Controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginRight: "0.25rem" }}>
                          {t("qty")}:
                        </span>
                        <button
                          style={qtyBtnStyle}
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span
                          style={{
                            minWidth: "28px",
                            textAlign: "center",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          style={{
                            ...qtyBtnStyle,
                            opacity: item.quantity >= maxQty ? 0.4 : 1,
                            cursor: item.quantity >= maxQty ? "not-allowed" : "pointer",
                          }}
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          disabled={item.quantity >= maxQty}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-muted)",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          transition: "var(--transition-fast)",
                          padding: "0.25rem 0",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Divider between items */}
                {index < cartItems.length - 1 && (
                  <div
                    style={{
                      height: "1px",
                      background: "var(--border)",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Order Summary Column ── */}
        <div>
          <div
            style={{
              ...cardStyle,
              position: "sticky",
              top: "8rem",
            }}
          >
            <h2
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gold)",
                marginBottom: "1.5rem",
              }}
            >
              Order Summary
            </h2>

            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
              </span>
              <span style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500 }}>
                SAR {subtotal}
              </span>
            </div>

            {/* Shipping */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Shipping</span>
              <span
                style={{
                  color: shippingCost === 0 ? "#16a34a" : "var(--text-primary)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {shippingCost === 0 ? "FREE" : `SAR ${shippingCost}`}
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "1.25rem" }} />

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--text-primary)",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                }}
              >
                SAR {total}
              </span>
            </div>

            {/* Tamara installment */}
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                marginBottom: "1.5rem",
                textAlign: "right",
              }}
            >
              or 3 x SAR {installment} with Tamara
            </p>

            {/* Promo Code */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  background: "rgba(166, 124, 82, 0.04)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "")}
              />
              <button
                onClick={handleApplyPromo}
                style={{
                  padding: "0.75rem 1.25rem",
                  background: "var(--primary-soft)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--gold)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "var(--transition-fast)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "1rem", marginTop: "-1rem" }}>
                Invalid promo code. Please try again.
              </p>
            )}

            {/* Checkout Button */}
            <Link
              href="/checkout"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "1rem",
                background: "var(--gold-shimmer)",
                color: "var(--primary)",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "0.85rem",
              }}
            >
              Proceed to Checkout
              <span style={{ fontSize: "1rem" }}>&rarr;</span>
            </Link>

            {/* Trust badges */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Secure checkout</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Free delivery over SAR 200</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>30-day free returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
