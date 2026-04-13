"use client";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import MarqueeBanner from "@/components/MarqueeBanner";
import CategoryCards from "@/components/CategoryCards";
import TrustBadges from "@/components/TrustBadges";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />
      <MarqueeBanner />

      <section style={{ padding: "6rem 0 4rem" }}>
        <div className="container">
          <div className="gold-divider"></div>
          <h2 className="section-title">{t('featuredTitle')}</h2>
          <p className="section-subtitle">{t('featuredDesc')}</p>
        </div>
        <ProductGrid />
      </section>

      <CategoryCards />
      <TrustBadges />
      <ReviewsSection />
    </>
  );
}
