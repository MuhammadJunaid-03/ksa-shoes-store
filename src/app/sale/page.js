import Link from "next/link";

export const metadata = {
  title: "Sale | Al-Zaytoun",
  description: "Shop limited-time offers on premium Arabic footwear. Discounts on select sandals and shoes.",
};

const goldGradientText = {
  background: "var(--gold-text)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function Sale() {
  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <div className="gold-divider"></div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            fontWeight: 600,
            marginBottom: "1rem",
            ...goldGradientText,
          }}
        >
          Sale
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "1rem" }}>
          Check our collection for items marked with sale prices. Limited time offers on select styles.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
          New markdowns added regularly &mdash; do not miss out on premium quality at exceptional prices.
        </p>
        <Link
          href="/sandals"
          style={{
            display: "inline-block",
            padding: "0.85rem 1.5rem",
            background: "var(--gold-shimmer)",
            color: "var(--primary)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          Browse Collection &rarr;
        </Link>
      </div>
    </div>
  );
}
