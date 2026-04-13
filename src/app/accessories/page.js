"use client";
import ProductGrid from "@/components/ProductGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function Accessories() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
      <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="gold-divider"></div>
        <h1 className="section-title" style={{ fontSize: "3.5rem" }}>{t('accessories')}</h1>
        <p className="section-subtitle" style={{ marginBottom: "0" }}>
          {t('lang') === 'ar' ? 'أحزمة جلدية فاخرة ومجموعات العناية بالأحذية.' : 'Premium leather belts, shoe care kits, and accessories to complement your collection.'}
        </p>
      </div>
      <ProductGrid category="accessories" />
    </div>
  );
}
