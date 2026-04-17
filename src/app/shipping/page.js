import Link from "next/link";

export const metadata = {
  title: "Shipping & Returns | Al-Zaytoun",
  description: "Free shipping on orders over SAR 200. Next-day delivery in Riyadh & Jeddah. 30-day hassle-free returns.",
};

const shippingRows = [
  { region: "Riyadh & Jeddah", time: "Next Day", free: "FREE over SAR 200", under: "SAR 20" },
  { region: "Major Cities", time: "2 \u2013 3 Days", free: "FREE over SAR 200", under: "SAR 25" },
  { region: "Other Areas", time: "3 \u2013 5 Days", free: "FREE over SAR 300", under: "SAR 35" },
];

const returnSteps = [
  { step: "1", title: "Contact Us", desc: "Reach out via WhatsApp or email within 30 days of delivery." },
  { step: "2", title: "We Arrange Pickup", desc: "Free pickup from your door \u2014 no need to visit a drop-off point." },
  { step: "3", title: "Refund or Exchange", desc: "Refund in 5\u20137 business days to original payment, or exchange for a different size or color." },
];

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

const sectionHeading = {
  fontFamily: "var(--font-display)",
  fontSize: "1.75rem",
  fontWeight: 600,
  marginBottom: "1.5rem",
  ...goldGradientText,
};

export default function Shipping() {
  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div className="gold-divider"></div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", ...goldGradientText }}>
          Shipping &amp; Returns
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.6, fontSize: "1.05rem" }}>
          Fast, reliable delivery across Saudi Arabia with hassle-free returns.
        </p>
      </div>

      {/* Shipping Table */}
      <div style={{ ...cardStyle, marginBottom: "2rem", overflowX: "auto" }}>
        <h2 style={sectionHeading}>Delivery Options</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Region", "Delivery Time", "Free Shipping", "Under Threshold"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: "var(--gold)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    borderBottom: "1px solid var(--border)",
                    background: "rgba(166, 124, 82, 0.08)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shippingRows.map((r) => (
              <tr key={r.region}>
                <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)", fontWeight: 600 }}>{r.region}</td>
                <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>{r.time}</td>
                <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)", color: "var(--gold)" }}>{r.free}</td>
                <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>{r.under}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tracking & Partners */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "4rem" }}>
        <div style={{ ...cardStyle, textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>&#128230;</div>
          <h3 style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: "0.5rem" }}>
            Order Tracking
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Track your order via WhatsApp &mdash; we send automatic updates at every step.
          </p>
        </div>
        <div style={{ ...cardStyle, textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>&#128666;</div>
          <h3 style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: "0.5rem" }}>
            Delivery Partners
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            SMSA Express &amp; Aramex &mdash; trusted nationwide logistics.
          </p>
        </div>
      </div>

      {/* Returns Section */}
      <div style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="gold-divider"></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600, ...goldGradientText }}>
            30-Day Return Policy
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {returnSteps.map((s) => (
            <div key={s.step} style={{ ...cardStyle, textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(166, 124, 82, 0.12)",
                  color: "var(--gold)",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                {s.step}
              </div>
              <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Return Conditions */}
        <div style={{ ...cardStyle, maxWidth: "720px", margin: "0 auto" }}>
          <h3 style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: "1rem" }}>
            Return Conditions
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Items must be unworn and in original condition",
              "Original packaging and tags must be attached",
              "Return request within 30 days of delivery",
              "Exchanges available for different size or color",
              "Refund processed in 5\u20137 business days to original payment method",
            ].map((c) => (
              <li
                key={c}
                style={{
                  padding: "0.65rem 0",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ color: "var(--gold)", fontSize: "0.85rem" }}>&#10003;</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COD Note */}
      <div
        style={{
          ...cardStyle,
          maxWidth: "720px",
          margin: "0 auto",
          textAlign: "center",
          background: "var(--primary-soft)",
          borderColor: "rgba(166, 124, 82, 0.25)",
        }}
      >
        <h3 style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: "0.5rem" }}>
          Cash on Delivery
        </h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          COD available nationwide &mdash; SAR 15 COD fee applies.
          <br />
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>Save by paying online!</span>{" "}
          We accept Mada, Visa, Mastercard, Apple Pay, Tamara &amp; Tabby.
        </p>
      </div>
    </div>
  );
}
