"use client";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import MarqueeBanner from "@/components/MarqueeBanner";
import CategoryCards from "@/components/CategoryCards";
import TrustBadges from "@/components/TrustBadges";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  { number: "38+", labelEn: "Years of Heritage", labelAr: "سنة من التراث", icon: "🏛️" },
  { number: "50K+", labelEn: "Happy Customers", labelAr: "عميل سعيد", icon: "👥" },
  { number: "4.8", labelEn: "Average Rating", labelAr: "متوسط التقييم", icon: "★" },
  { number: "100%", labelEn: "Authentic Leather", labelAr: "جلد أصلي", icon: "✓" },
];

export default function Home() {
  const { t, lang } = useLanguage();

  return (
    <>
      <Hero />
      <MarqueeBanner />

      {/* ── Stats Banner ── */}
      <section style={{
        padding: "4rem 0",
        background: "linear-gradient(180deg, var(--primary-soft) 0%, var(--primary-elevated) 100%)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative background pattern */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(166,124,82,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(166,124,82,0.03) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

        <style>{`
          .az-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            text-align: center;
            position: relative;
          }
          @media (max-width: 640px) {
            .az-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          }
        `}</style>
        <div className="container">
          <div className="az-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} style={{
                padding: "1.5rem 1rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                background: "rgba(245, 237, 228, 0.6)",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
              }}>
                <div style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.5rem",
                  opacity: 0.8,
                }}>{stat.icon}</div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  background: "var(--gold-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                  marginBottom: "0.4rem",
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}>
                  {lang === "ar" ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section style={{ padding: "6rem 0 4rem" }}>
        <div className="container">
          <div className="gold-divider"></div>
          <h2 className="section-title">{t('featuredTitle')}</h2>
          <p className="section-subtitle">{t('featuredDesc')}</p>
        </div>
        <ProductGrid />
      </section>

      <CategoryCards />

      {/* ── Tamara BNPL Banner ── */}
      <section style={{
        padding: "3rem 0",
        background: "var(--primary-soft)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          textAlign: "center",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <div style={{ textAlign: "left" }}>
              <div style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "var(--font-display)",
              }}>
                {lang === 'ar' ? 'قسّط بدون فوائد مع تمارا' : 'Split in 3 with Tamara'}
              </div>
              <div style={{
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
              }}>
                {lang === 'ar' ? 'ادفع على ٣ دفعات بدون أي فوائد. مدى، أبل باي، فيزا.' : 'Pay in 3 interest-free payments. Mada, Apple Pay, Visa accepted.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />
      <ReviewsSection />
    </>
  );
}
