"use client";
import { useState } from "react";

const faqSections = [
  {
    title: "Orders & Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Mada, Visa, Mastercard, Apple Pay, Tamara (split in 3 interest-free installments), Tabby, and Cash on Delivery.",
      },
      {
        q: "Is my payment secure?",
        a: "Yes, all transactions are encrypted with SSL. We use certified payment gateways that meet the highest security standards.",
      },
      {
        q: "Can I pay in installments?",
        a: "Yes! Use Tamara at checkout to split your payment into 3 interest-free installments. No extra fees.",
      },
      {
        q: "How do I track my order?",
        a: "You will receive WhatsApp updates with tracking information at every step. You can also email us at support@alzaytoun.com for order status.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Riyadh and Jeddah get next-day delivery. Other major cities receive orders in 2\u20133 days. Remote areas take 3\u20135 business days.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes, free shipping on orders over SAR 200 to major cities, and over SAR 300 to other areas.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we ship within Saudi Arabia only. International shipping is coming soon.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day hassle-free return policy on unworn items in original packaging with tags attached.",
      },
      {
        q: "How do I start a return?",
        a: "WhatsApp us at +966 50 123 4567 or email support@alzaytoun.com. We will arrange free pickup from your door.",
      },
      {
        q: "How long until I get my refund?",
        a: "Refunds are processed within 5\u20137 business days after we receive and inspect the returned item. The refund goes to your original payment method.",
      },
    ],
  },
  {
    title: "Products & Sizing",
    items: [
      {
        q: "Are your products authentic?",
        a: "100% authentic. Every product comes with a certificate of authenticity and is sourced directly from verified manufacturers.",
      },
      {
        q: "How do I find my size?",
        a: "Check our Size Guide page for a full conversion chart and measuring instructions. When in doubt, WhatsApp us your foot measurement and we will recommend the best size.",
      },
      {
        q: "What leather do you use?",
        a: "We use premium Italian calfskin, genuine camel leather, and hand-selected exotic textures. Every material is carefully chosen for durability and comfort.",
      },
    ],
  },
];

const goldGradientText = {
  background: "var(--gold-text)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "1.25rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span
          style={{
            color: isOpen ? "var(--gold)" : "var(--text-primary)",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            transition: "color 0.3s ease",
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: "var(--gold)",
            fontSize: "1.2rem",
            flexShrink: 0,
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          &#9660;
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: "0 0 1.25rem",
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  function toggle(sectionIdx, itemIdx) {
    const key = `${sectionIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div className="gold-divider"></div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", ...goldGradientText }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6, fontSize: "1.05rem" }}>
          Everything you need to know about shopping with Al-Zaytoun.
        </p>
      </div>

      {/* FAQ Sections */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {faqSections.map((section, sIdx) => (
          <div key={section.title} style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "var(--gold)",
              }}
            >
              {section.title}
            </h2>
            <div
              style={{
                background: "var(--primary-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "0 1.5rem",
              }}
            >
              {section.items.map((item, iIdx) => (
                <AccordionItem
                  key={iIdx}
                  question={item.q}
                  answer={item.a}
                  isOpen={!!openItems[`${sIdx}-${iIdx}`]}
                  onToggle={() => toggle(sIdx, iIdx)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still Need Help */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          background: "var(--primary-soft)",
          border: "1px solid rgba(201, 169, 110, 0.25)",
          borderRadius: "var(--radius-md)",
          padding: "2.5rem 2rem",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "0.75rem", ...goldGradientText }}>
          Still Have Questions?
        </h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Our team is ready to help. Reach out anytime.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/966501234567"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.85rem 1.5rem",
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
            WhatsApp Us
          </a>
          <a
            href="mailto:support@alzaytoun.com"
            style={{
              padding: "0.85rem 1.5rem",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
