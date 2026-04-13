"use client";
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.heroImageContainer}>
        <img
          src="/assets/hero_dark.png"
          alt="Premium Leather Arabic Sandal — Luxury Collection"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroLabel}>
          <span className={styles.heroLabelLine}></span>
          <span>{t('heroLabel')}</span>
          <span className={styles.heroLabelLine}></span>
        </div>

        <h1 className={styles.heroTitle}>
          {t('heroTitle1')} <br/>
          <span className={styles.heroHighlight}>{t('heroTitle2')}</span>
        </h1>

        <p className={styles.heroSubtitle}>
          {t('heroDesc')}
        </p>

        <div className={styles.heroActions}>
          <Link href="/sandals" className={styles.btnPrimary}>
            {t('shopCollection')}
          </Link>
          <Link href="/about" className={styles.btnSecondary}>
            {t('ourHeritage')}
          </Link>
        </div>

        {/* Payment & shipping strip */}
        <div className={styles.heroStrip}>
          <div className={styles.heroStripItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span>{lang === 'ar' ? 'شحن مجاني' : 'Free Shipping'}</span>
          </div>
          <span className={styles.heroStripDot}>·</span>
          <div className={styles.heroStripItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span>{lang === 'ar' ? 'قسّط مع تمارا' : 'Split with Tamara'}</span>
          </div>
          <span className={styles.heroStripDot}>·</span>
          <div className={styles.heroStripItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
            <span>{lang === 'ar' ? 'إرجاع مجاني ٣٠ يوم' : '30-Day Free Returns'}</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>{t('scroll')}</span>
        <span className={styles.scrollLine}></span>
      </div>

      <div className={styles.heroDecor}></div>
    </section>
  );
}
