export const metadata = {
  title: "Our Heritage | Al-Zaytoun",
  description: "Founded in 1987, Al-Zaytoun has been crafting premium Arabic footwear for over 38 years. Discover our story of craftsmanship and heritage.",
};

const timeline = [
  { year: "1987", title: "Founded", desc: "Master artisan Abdullah Al-Zaytoun opens a small workshop in Riyadh, hand-stitching sandals using techniques passed down through generations." },
  { year: "1995", title: "First Store", desc: "The first Al-Zaytoun retail showroom opens on King Fahd Road, earning a loyal following among discerning customers." },
  { year: "2005", title: "National Brand", desc: "Expansion to Jeddah, Dammam, and Mecca. Al-Zaytoun becomes the trusted name in premium Arabic footwear across the Kingdom." },
  { year: "2015", title: "Online Launch", desc: "The e-commerce platform launches, bringing our curated collection to customers everywhere in Saudi Arabia." },
  { year: "2026", title: "New Era", desc: "A bold new chapter with modern designs rooted in heritage, advanced e-commerce, and same-day delivery across major cities." },
];

const values = [
  { icon: "\u2726", title: "Craftsmanship", desc: "Every stitch, every cut is executed with precision by skilled artisans who have dedicated their lives to their craft." },
  { icon: "\u2727", title: "Authenticity", desc: "100% genuine materials, verified sourcing, and a certificate of authenticity with every pair." },
  { icon: "\u2605", title: "Heritage", desc: "Rooted in Saudi tradition and the timeless art of Arabic leatherwork spanning centuries." },
  { icon: "\u2666", title: "Quality", desc: "Premium Italian calfskin, genuine camel leather, and exotic textures selected for durability and beauty." },
];

const stats = [
  { number: "38", label: "Years of Heritage" },
  { number: "50,000+", label: "Happy Customers" },
  { number: "4.8\u2605", label: "Average Rating" },
  { number: "100%", label: "Authentic" },
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

export default function About() {
  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div className="gold-divider"></div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 600, marginBottom: "1rem", ...goldGradientText }}>
          Our Heritage
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7, fontSize: "1.05rem" }}>
          For over three decades, Al-Zaytoun has stood at the intersection of timeless tradition and modern elegance.
        </p>
      </div>

      {/* Brand Story */}
      <div style={{ ...cardStyle, maxWidth: "800px", margin: "0 auto 4rem", padding: "2.5rem" }}>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
          Founded in 1987 in the heart of Riyadh, Al-Zaytoun began as a small workshop where master artisan Abdullah Al-Zaytoun pursued a singular vision: to create footwear that honored Saudi heritage while meeting the highest standards of luxury and comfort.
        </p>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
          What started as one man and his craft has grown into the Kingdom's most trusted name in premium Arabic footwear. From hand-stitched sandals to contemporary designs, every pair carries the DNA of decades of mastery.
        </p>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem" }}>
          Today, Al-Zaytoun serves thousands of discerning customers who value authenticity, quality materials, and the confidence that comes from wearing something truly exceptional. Our artisans continue to push boundaries while staying true to the techniques that made us who we are.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div className="gold-divider"></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600, ...goldGradientText }}>
            Our Journey
          </h2>
        </div>
        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              background: "var(--border)",
            }}
          />
          {timeline.map((t, i) => (
            <div
              key={t.year}
              style={{
                display: "flex",
                gap: "1.5rem",
                marginBottom: i < timeline.length - 1 ? "2rem" : 0,
                position: "relative",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: "50px",
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "4px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    border: "3px solid var(--primary)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
              <div style={{ paddingBottom: "0.5rem" }}>
                <span style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>
                  {t.year}
                </span>
                <span style={{ color: "var(--text-muted)", margin: "0 0.75rem", fontSize: "0.85rem" }}>&mdash;</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "1.05rem" }}>{t.title}</span>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginTop: "0.35rem" }}>
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div className="gold-divider"></div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600, ...goldGradientText }}>
            Our Values
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {values.map((v) => (
            <div key={v.title} style={{ ...cardStyle, textAlign: "center" }}>
              <div style={{ fontSize: "2rem", color: "var(--gold)", marginBottom: "1rem" }}>{v.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                {v.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Artisans */}
      <div style={{ ...cardStyle, maxWidth: "800px", margin: "0 auto 4rem", padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 600, ...goldGradientText }}>
            Our Artisans
          </h2>
        </div>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1rem", textAlign: "center" }}>
          Behind every pair of Al-Zaytoun shoes is a team of master craftsmen with decades of experience. Our artisans are trained in traditional leatherworking techniques passed down through generations, combined with modern methods that ensure consistent quality. Many have been with us for over 20 years, bringing an unmatched attention to detail that transforms premium materials into footwear you can feel proud to wear.
        </p>
      </div>

      {/* Quality Promise */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          background: "var(--primary-soft)",
          border: "1px solid rgba(201, 169, 110, 0.25)",
          borderRadius: "var(--radius-md)",
          padding: "3rem 2rem",
          maxWidth: "800px",
          margin: "0 auto 4rem",
        }}
      >
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem", ...goldGradientText }}>
          Quality Promise
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
          Every pair undergoes <span style={{ color: "var(--gold)", fontWeight: 700 }}>47 quality checks</span> before reaching you &mdash; from leather selection and stitching precision to sole durability and finish inspection. We do not ship anything we would not wear ourselves.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ ...cardStyle, textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.25rem",
                fontWeight: 700,
                marginBottom: "0.35rem",
                ...goldGradientText,
              }}
            >
              {s.number}
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: 500 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
