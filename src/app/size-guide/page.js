import Link from "next/link";

export const metadata = {
  title: "Size Guide | Al-Zaytoun",
  description: "Find your perfect fit with our size conversion chart and measuring guide. EU, UK, US, and CM sizes.",
};

const sizes = [
  { eu: 39, uk: "5.5", us: "6.5", cm: "25.0" },
  { eu: 40, uk: "6", us: "7", cm: "25.5" },
  { eu: 41, uk: "7", us: "8", cm: "26.5" },
  { eu: 42, uk: "8", us: "9", cm: "27.0" },
  { eu: 43, uk: "8.5", us: "9.5", cm: "27.5" },
  { eu: 44, uk: "9.5", us: "10.5", cm: "28.5" },
  { eu: 45, uk: "10.5", us: "11.5", cm: "29.0" },
];

const steps = [
  {
    num: "1",
    title: "Place your foot on paper",
    desc: "Stand on a sheet of paper with your heel against a wall. Wear the socks you would normally wear with shoes.",
  },
  {
    num: "2",
    title: "Mark heel and longest toe",
    desc: "Using a pen, mark the tip of your longest toe and the back of your heel on the paper.",
  },
  {
    num: "3",
    title: "Measure the distance in cm",
    desc: "Use a ruler to measure the distance between the two marks. Measure both feet and use the larger measurement.",
  },
  {
    num: "4",
    title: "Match to our chart below",
    desc: "Find your centimeter measurement in the chart and select the corresponding size.",
  },
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

export default function SizeGuide() {
  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div className="gold-divider"></div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", ...goldGradientText }}>
          Size Guide
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6, fontSize: "1.05rem" }}>
          Find your perfect fit with our step-by-step measuring guide and conversion chart.
        </p>
      </div>

      {/* How to Measure */}
      <div style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "2rem",
            ...goldGradientText,
          }}
        >
          How to Measure Your Foot
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {steps.map((s) => (
            <div key={s.num} style={{ ...cardStyle, textAlign: "center" }}>
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
                {s.num}
              </div>
              <h3 style={{ color: "var(--text-primary)", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Size Chart */}
      <div style={{ ...cardStyle, marginBottom: "4rem", overflowX: "auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            ...goldGradientText,
          }}
        >
          Size Conversion Chart
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["EU", "UK", "US", "CM"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "var(--gold)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
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
            {sizes.map((row) => (
              <tr key={row.eu}>
                <td style={{ padding: "1rem", textAlign: "center", borderBottom: "1px solid var(--border)", fontWeight: 600 }}>
                  {row.eu}
                </td>
                <td style={{ padding: "1rem", textAlign: "center", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                  {row.uk}
                </td>
                <td style={{ padding: "1rem", textAlign: "center", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                  {row.us}
                </td>
                <td style={{ padding: "1rem", textAlign: "center", borderBottom: "1px solid var(--border)", color: "var(--gold)" }}>
                  {row.cm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fit Advice */}
      <div style={{ ...cardStyle, maxWidth: "720px", margin: "0 auto 4rem", textAlign: "center" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", marginBottom: "0.75rem", color: "var(--gold)" }}>
          Fit Advice
        </h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1rem" }}>
          Most of our sandals run true to size. If you are between sizes, we recommend going up for a more comfortable fit. Leather sandals will stretch slightly with wear, so a snug fit initially is perfectly normal.
        </p>
      </div>

      {/* Help CTA */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          textAlign: "center",
          background: "var(--primary-soft)",
          border: "1px solid rgba(166, 124, 82, 0.25)",
          borderRadius: "var(--radius-md)",
          padding: "2.5rem 2rem",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "0.75rem", ...goldGradientText }}>
          Need Help Finding Your Size?
        </h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          WhatsApp us a photo of your foot measurement and we will recommend the perfect size.
        </p>
        <a
          href="https://wa.me/966501234567?text=Hi%2C%20I%20need%20help%20finding%20my%20size"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
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
          WhatsApp Us Your Measurement
        </a>
      </div>
    </div>
  );
}
