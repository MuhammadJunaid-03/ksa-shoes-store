"use client";
import { useState } from "react";

const contactMethods = [
  {
    icon: "\uD83D\uDCF1",
    title: "WhatsApp",
    detail: "+966 50 123 4567",
    sub: "Instant replies during business hours",
    href: "https://wa.me/966501234567",
    linkText: "Chat Now",
  },
  {
    icon: "\u2709\uFE0F",
    title: "Email",
    detail: "support@alzaytoun.com",
    sub: "We respond within 24 hours",
    href: "mailto:support@alzaytoun.com",
    linkText: "Send Email",
  },
  {
    icon: "\uD83D\uDD52",
    title: "Working Hours",
    detail: "Sun \u2013 Thu: 9 AM \u2013 9 PM",
    sub: "Arabia Standard Time (AST)",
    href: null,
    linkText: null,
  },
];

const subjects = [
  "General Inquiry",
  "Order Status",
  "Returns & Exchanges",
  "Size Help",
  "Wholesale",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

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
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "var(--primary-soft)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "var(--transition-fast)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    color: "var(--text-secondary)",
    fontSize: "0.85rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };

  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div className="gold-divider"></div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", ...goldGradientText }}>
          Get in Touch
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6, fontSize: "1.05rem" }}>
          We are here to help with orders, sizing, returns, or anything else you need.
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {contactMethods.map((m) => (
          <div key={m.title} style={cardStyle}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{m.icon}</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--gold)" }}>
              {m.title}
            </h3>
            <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "1rem", marginBottom: "0.35rem" }}>
              {m.detail}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {m.sub}
            </p>
            {m.href && (
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.6rem 1.4rem",
                  background: "var(--gold-shimmer)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                }}
              >
                {m.linkText}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div style={{ ...cardStyle, maxWidth: "720px", margin: "0 auto 4rem", textAlign: "left", padding: "2.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", marginBottom: "0.5rem", ...goldGradientText }}>
          Send Us a Message
        </h2>
        <div className="gold-divider" style={{ margin: "0 0 2rem" }}></div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#10003;</div>
            <h3 style={{ color: "var(--gold)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
            <p style={{ color: "var(--text-secondary)" }}>We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Phone (+966)</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="05X XXX XXXX"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                >
                  <option value="">Select a topic</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="How can we help?"
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.85rem 1.5rem",
                background: "var(--gold-shimmer)",
                color: "var(--primary)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.9rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Map Placeholder */}
      <div
        style={{
          ...cardStyle,
          maxWidth: "720px",
          margin: "0 auto",
          padding: "3rem 2rem",
          background: "var(--primary-soft)",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>&#128205;</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "0.75rem", ...goldGradientText }}>
          Visit Our Showroom
        </h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          King Fahd Road, Al-Olaya District
          <br />
          Riyadh, Saudi Arabia
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.75rem" }}>
          Open Sunday &ndash; Thursday, 9 AM &ndash; 9 PM AST
        </p>
      </div>
    </div>
  );
}
