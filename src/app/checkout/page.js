"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const cities = ["Riyadh", "Jeddah", "Dammam", "Makkah", "Madinah", "Khobar", "Tabuk", "Abha", "Other"];

export default function CheckoutPage() {
  const { cartItems, cartCount } = useCart();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    whatsappUpdates: true,
    fullName: "",
    city: "Riyadh",
    district: "",
    street: "",
    building: "",
    notes: "",
    shipping: "standard",
    payment: "card",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCosts = { standard: 0, express: 25, sameday: 45 };
  const shippingCost = subtotal >= 200 ? (form.shipping === "standard" ? 0 : shippingCosts[form.shipping]) : shippingCosts[form.shipping] || 25;
  const codFee = form.payment === "cod" ? 15 : 0;
  const total = subtotal + shippingCost + codFee;
  const installment = Math.ceil(total / 3);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!form.email || !form.phone || !form.fullName || !form.street) {
      alert("Please fill in all required fields.");
      return;
    }
    setOrderPlaced(true);
  };

  /* ── Shared style helpers ── */
  const goldGradientText = {
    background: "var(--gold-text)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    marginBottom: "0.4rem",
    fontWeight: 500,
  };

  const sectionHeading = {
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--gold)",
    marginBottom: "1.25rem",
    marginTop: "2rem",
  };

  const radioRow = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem",
    background: "var(--primary-card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    transition: "border-color 0.2s",
    marginBottom: "0.5rem",
  };

  /* ── Order Placed Success ── */
  if (orderPlaced) {
    return (
      <div className="container" style={{ paddingTop: "10rem", paddingBottom: "5rem", textAlign: "center", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "1rem", ...goldGradientText }}>
            Thank You!
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "450px", margin: "0 auto 1rem", lineHeight: 1.6 }}>
            Your order has been placed successfully. You will receive a confirmation via WhatsApp shortly.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
            Order #AZ-{Math.floor(Math.random() * 90000) + 10000}
          </p>
          <Link href="/" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "var(--gold-shimmer)", color: "var(--primary)", borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ── Empty Cart ── */
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ paddingTop: "10rem", paddingBottom: "5rem", textAlign: "center", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem", ...goldGradientText }}>
            Your cart is empty
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Add items to your cart before checking out.</p>
          <Link href="/sandals" style={{ display: "inline-block", padding: "1rem 2rem", background: "var(--gold-shimmer)", color: "var(--primary)", borderRadius: "var(--radius-sm)", textDecoration: "none", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem" }}>
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem", minHeight: "80vh" }}>
      <style>{`
        .az-checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 900px) {
          .az-checkout-grid {
            grid-template-columns: 1fr 380px;
          }
        }
        .az-checkout-grid input:focus,
        .az-checkout-grid select:focus {
          border-color: var(--gold) !important;
        }
      `}</style>

      <div style={{ marginBottom: "2rem" }}>
        <div className="gold-divider" style={{ margin: "0 0 1.5rem" }}></div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600, ...goldGradientText }}>
          Checkout
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="az-checkout-grid">
          {/* ── Left: Form ── */}
          <div>
            {/* Express Checkout */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                <button type="button" style={{ flex: 1, padding: "0.85rem 1rem", background: "#000", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "#fff", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "border-color 0.2s" }}>
                   Apple Pay
                </button>
                <button type="button" style={{ flex: 1, padding: "0.85rem 1rem", background: "var(--primary-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                  Mada Pay
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }}></div>
                <span>OR</span>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }}></div>
              </div>
            </div>

            {/* Contact */}
            <h3 style={sectionHeading}>Contact</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => update("email", e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input type="tel" placeholder="+966 5X XXX XXXX" value={form.phone} onChange={e => update("phone", e.target.value)} style={inputStyle} required />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <input type="checkbox" checked={form.whatsappUpdates} onChange={e => update("whatsappUpdates", e.target.checked)} style={{ accentColor: "var(--gold)" }} />
                Send order updates via WhatsApp
              </label>
            </div>

            {/* Delivery Address */}
            <h3 style={sectionHeading}>Delivery Address</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" placeholder="Mohammed Al-Rashid" value={form.fullName} onChange={e => update("fullName", e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>City *</label>
                  <select value={form.city} onChange={e => update("city", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>District</label>
                  <input type="text" placeholder="Al-Olaya" value={form.district} onChange={e => update("district", e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Street Address *</label>
                <input type="text" placeholder="Street name, number" value={form.street} onChange={e => update("street", e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Building / Villa</label>
                  <input type="text" placeholder="Building 12" value={form.building} onChange={e => update("building", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Additional Notes</label>
                  <input type="text" placeholder="Near landmark..." value={form.notes} onChange={e => update("notes", e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <h3 style={sectionHeading}>Shipping Method</h3>
            {[
              { id: "standard", label: "Standard (2-3 days)", price: subtotal >= 200 ? "FREE" : "SAR 25" },
              { id: "express", label: "Express Next Day", price: "SAR 25" },
              { id: "sameday", label: "Same Day (Riyadh & Jeddah)", price: "SAR 45" },
            ].map(opt => (
              <label key={opt.id} style={{ ...radioRow, borderColor: form.shipping === opt.id ? "var(--gold)" : undefined }}>
                <input type="radio" name="shipping" value={opt.id} checked={form.shipping === opt.id} onChange={() => update("shipping", opt.id)} style={{ accentColor: "var(--gold)" }} />
                <span style={{ flex: 1, color: "var(--text-primary)", fontSize: "0.9rem" }}>{opt.label}</span>
                <span style={{ color: opt.price === "FREE" ? "#4ade80" : "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 600 }}>{opt.price}</span>
              </label>
            ))}

            {/* Payment Method */}
            <h3 style={sectionHeading}>Payment Method</h3>
            {[
              { id: "card", label: "Credit/Debit Card (Mada, Visa, Mastercard)", extra: null },
              { id: "tamara", label: "Tamara — Split in 3 interest-free payments", extra: `3 × SAR ${installment}` },
              { id: "cod", label: "Cash on Delivery", extra: "+SAR 15 COD fee" },
            ].map(opt => (
              <label key={opt.id} style={{ ...radioRow, borderColor: form.payment === opt.id ? "var(--gold)" : undefined }}>
                <input type="radio" name="payment" value={opt.id} checked={form.payment === opt.id} onChange={() => update("payment", opt.id)} style={{ accentColor: "var(--gold)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}>{opt.label}</div>
                  {opt.extra && <div style={{ color: "var(--gold)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{opt.extra}</div>}
                </div>
              </label>
            ))}
            {form.payment === "cod" && (
              <p style={{ color: "var(--gold)", fontSize: "0.8rem", marginTop: "0.25rem", paddingLeft: "1rem" }}>
                Save SAR 15 by paying online →
              </p>
            )}

            {/* Place Order Button */}
            <button type="submit" style={{ width: "100%", padding: "1.1rem", background: "var(--gold-shimmer)", backgroundSize: "200% auto", color: "var(--primary)", borderRadius: "var(--radius-sm)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.9rem", cursor: "pointer", marginTop: "2rem", border: "none", transition: "all 0.3s" }}>
              Place Order — SAR {total}
            </button>
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "0.75rem" }}>
              🔒 Your payment is secure and encrypted
            </p>
          </div>

          {/* ── Right: Order Summary ── */}
          <div>
            <div style={{ background: "var(--primary-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "1.75rem", position: "sticky", top: "8rem" }}>
              <h2 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold)", marginBottom: "1.5rem" }}>
                Order Summary
              </h2>

              {/* Items */}
              {cartItems.map(item => (
                <div key={item.cartKey} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--primary-soft)", flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                      Size: {item.selectedSize} | {item.selectedColor} | Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
                    SAR {item.price * item.quantity}
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Subtotal ({cartCount})</span>
                <span style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>SAR {subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Shipping</span>
                <span style={{ color: shippingCost === 0 ? "#4ade80" : "var(--text-primary)", fontSize: "0.85rem" }}>
                  {shippingCost === 0 ? "FREE" : `SAR ${shippingCost}`}
                </span>
              </div>
              {codFee > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>COD Fee</span>
                  <span style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>SAR {codFee}</span>
                </div>
              )}
              <div style={{ height: "1px", background: "var(--border)", margin: "0.75rem 0" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>Total</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--gold)" }}>SAR {total}</span>
              </div>

              {form.payment === "tamara" && (
                <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", textAlign: "right", marginTop: "0.5rem" }}>
                  3 × SAR {installment} with Tamara
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
