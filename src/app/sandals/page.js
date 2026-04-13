"use client";
import ProductGrid from "@/components/ProductGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function Sandals() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
      <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="gold-divider"></div>
        <h1 className="section-title" style={{ fontSize: "3.5rem" }}>{t('sandalsTitle')}</h1>
        <p className="section-subtitle" style={{ marginBottom: "0" }}>
          {t('sandalsDesc')}
        </p>
      </div>
      <ProductGrid category="arabic-sandals" />
    </div>
  );
}
