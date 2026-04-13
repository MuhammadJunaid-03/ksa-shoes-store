"use client";
import ProductGrid from "@/components/ProductGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function Shoes() {
  const { t } = useLanguage();

  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
      <div className="container" style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="gold-divider"></div>
        <h1 className="section-title" style={{ fontSize: "3.5rem" }}>{t('formalShoes')}</h1>
        <p className="section-subtitle" style={{ marginBottom: "0" }}>
          {t('lang') === 'ar' ? 'أحذية رسمية فاخرة مصنوعة من أجود أنواع الجلود الإيطالية.' : 'Premium formal shoes crafted from the finest Italian leather. Designed for the modern gentleman.'}
        </p>
      </div>
      <ProductGrid category="formal-shoes" />
    </div>
  );
}
