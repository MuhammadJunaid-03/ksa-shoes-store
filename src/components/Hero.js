"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

const slides = [
  {
    image: '/assets/sandal_black_dark.png',
    headlineEn: ['Crafted for', 'the Modern', 'Gentleman.'],
    headlineAr: ['صُنعت', 'للرجل العصري', 'بأيدٍ سعودية'],
    subtitleEn: 'Premium handcrafted Arabic sandals made from the finest Italian leather. Free shipping across Saudi Arabia.',
    subtitleAr: 'صنادل عربية فاخرة مصنوعة يدوياً من أجود أنواع الجلود الإيطالية. شحن مجاني في جميع أنحاء المملكة.',
    tagEn: 'Best Seller',
    tagAr: 'الأكثر مبيعاً',
    tagPrice: 'SAR 280',
    filter: 'none',
  },
  {
    image: '/assets/sandal_brown_dark.png',
    headlineEn: ['Heritage', 'Meets Modern', 'Luxury.'],
    headlineAr: ['التراث', 'يلتقي بالفخامة', 'العصرية'],
    subtitleEn: 'Hand-stitched with genuine camel leather. Each pair carries centuries of Arabian craftsmanship tradition.',
    subtitleAr: 'مخيطة يدوياً من جلد الإبل الأصيل. كل زوج يحمل قروناً من تقاليد الحرفة العربية.',
    tagEn: 'New Arrival',
    tagAr: 'وصل حديثاً',
    tagPrice: 'SAR 350',
    filter: 'hue-rotate(5deg) saturate(1.1)',
  },
  {
    image: '/assets/sandal_black_dark.png',
    headlineEn: ['Elegance', 'in Every', 'Footstep.'],
    headlineAr: ['أناقة', 'في كل', 'خطوة'],
    subtitleEn: 'Premium formal shoes for the distinguished gentleman. Split in 3 interest-free payments with Tamara.',
    subtitleAr: 'أحذية رسمية فاخرة للرجل المتميز. قسّط على ٣ دفعات بدون فوائد مع تمارا.',
    tagEn: 'Premium',
    tagAr: 'فاخر',
    tagPrice: 'SAR 520',
    filter: 'brightness(1.05) contrast(1.05)',
  },
];

export default function Hero() {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  const goToSlide = useCallback((index) => {
    if (transitioning) return;
    setTransitioning(true);
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
      setTransitioning(false);
    }, 400);
  }, [transitioning]);

  const slide = slides[current];

  return (
    <section className={styles.hero}>
      {/* Background layers */}
      <div className={styles.bgBase} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgGrid} />

      <div className={`container ${styles.heroInner}`}>
        {/* ── Left: Content ── */}
        <div className={`${styles.content} ${visible ? styles.contentVisible : ''}`}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>{t('heroLabel')}</span>
          </div>

          <h1 className={styles.headline} key={`headline-${current}`}>
            {(lang === 'ar' ? slide.headlineAr : slide.headlineEn).map((line, i) => (
              <span
                key={`${current}-${i}`}
                className={`${styles.headlineRow} ${i === 1 ? styles.headlineGold : ''}`}
                style={{ animationDelay: `${0.3 + i * 0.15}s` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className={styles.subtitle}>
            {lang === 'ar' ? slide.subtitleAr : slide.subtitleEn}
          </p>

          {/* Social proof */}
          <div className={styles.proofRow}>
            <div className={styles.proofStars}>★★★★★</div>
            <span className={styles.proofText}>
              {lang === 'ar' ? '٤.٨ من ٢٤٧+ تقييم' : '4.8 from 247+ reviews'}
            </span>
            <span className={styles.proofDot}>·</span>
            <span className={styles.proofText}>
              {lang === 'ar' ? '+٥٠ ألف عميل' : '50K+ customers'}
            </span>
          </div>

          {/* CTA */}
          <div className={styles.ctaRow}>
            <Link href="/sandals" className={styles.ctaPrimary}>
              {lang === 'ar' ? 'تسوق المجموعة' : 'Shop the Collection'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <div className={styles.ctaPrice}>
              <span className={styles.ctaPriceLabel}>
                {lang === 'ar' ? 'تبدأ من' : 'Starting from'}
              </span>
              <span className={styles.ctaPriceValue}>SAR 260</span>
            </div>
          </div>

          {/* Payment strip */}
          <div className={styles.paymentStrip}>
            <span>{lang === 'ar' ? 'مدى' : 'Mada'}</span>
            <span className={styles.paymentDot}>·</span>
            <span>Apple Pay</span>
            <span className={styles.paymentDot}>·</span>
            <span>Tamara</span>
            <span className={styles.paymentDot}>·</span>
            <span>{lang === 'ar' ? 'الدفع عند الاستلام' : 'COD'}</span>
          </div>
        </div>

        {/* ── Right: Product Showcase ── */}
        <div className={`${styles.showcase} ${visible ? styles.showcaseVisible : ''}`}>
          <div className={styles.productGlow} />
          <div className={styles.productFloat} key={`product-${current}`}>
            <img
              src={slide.image}
              alt="Premium Al-Zaytoun Arabic Sandal"
              className={styles.productImage}
              style={{ filter: slide.filter }}
            />
          </div>
          {/* Price tag */}
          <div className={styles.priceTag} key={`tag-${current}`}>
            <span className={styles.priceTagLabel}>{lang === 'ar' ? slide.tagAr : slide.tagEn}</span>
            <span className={styles.priceTagValue}>{slide.tagPrice}</span>
          </div>
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className={styles.slideNav}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.slideDot} ${i === current ? styles.slideDotActive : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom gold line */}
      <div className={styles.heroDecor} />

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
