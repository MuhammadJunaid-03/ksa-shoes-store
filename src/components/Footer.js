"use client";
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandBox}>
          <h2 className={styles.logoText}>Al-Zaytoun</h2>
          <p className={styles.brandDesc}>{t('footerDesc')}</p>
          <div className={styles.socialRow}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter/X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Snapchat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.959-.289.089-.05.19-.078.292-.078.204 0 .374.104.472.272.11.192.058.399-.093.56-.396.396-1.108.519-1.695.519-.108 0-.209-.006-.303-.018-.046-.006-.092-.012-.138-.012-.18 0-.319.063-.399.186-.12.189-.045.42.09.588.105.12.21.24.315.361.532.599.948 1.2 1.11 1.832.045.18.068.36.068.539 0 .696-.345 1.286-.893 1.531-.18.081-.375.141-.584.186-.045.009-.09.018-.134.03-.054.018-.108.045-.162.078-.09.054-.18.12-.27.198a5.53 5.53 0 01-.524.384c-.188.122-.378.221-.574.298a3.07 3.07 0 01-1.179.241c-.36 0-.702-.07-1.011-.199-.24-.099-.487-.222-.739-.36-.414-.228-.84-.465-1.34-.549a4.5 4.5 0 00-.749-.063c-.27 0-.537.03-.795.09-.501.084-.927.321-1.341.549-.252.138-.499.261-.739.36a2.76 2.76 0 01-1.011.199 3.07 3.07 0 01-1.179-.241 4.15 4.15 0 01-.574-.298 5.53 5.53 0 01-.524-.384 1.62 1.62 0 00-.27-.198c-.054-.033-.108-.06-.162-.078-.045-.012-.09-.021-.134-.03a2.94 2.94 0 01-.584-.186c-.548-.245-.893-.835-.893-1.531 0-.18.023-.36.068-.539.162-.633.578-1.233 1.11-1.832.105-.12.21-.24.315-.361.135-.168.21-.399.09-.588-.08-.123-.219-.186-.399-.186-.046 0-.092.006-.138.012a2.07 2.07 0 01-.303.018c-.587 0-1.299-.123-1.695-.519-.151-.161-.203-.368-.093-.56.098-.168.268-.272.472-.272.103 0 .203.028.292.078.3.168.659.273.959.289.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.447 1.069 10.804.793 11.794.793h.412z"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.2 8.2 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.12z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.linkGroup}>
          <h3 className={styles.linkTitle}>{t('shop')}</h3>
          <ul className={styles.linkList}>
            <li><Link href="/sandals">{t('arabicSandals')}</Link></li>
            <li><Link href="/shoes">{t('formalShoes')}</Link></li>
            <li><Link href="/accessories">{t('accessories')}</Link></li>
            <li><Link href="/sale">{t('sale')}</Link></li>
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h3 className={styles.linkTitle}>{t('support')}</h3>
          <ul className={styles.linkList}>
            <li><Link href="/contact">{t('contactUs')}</Link></li>
            <li><Link href="/shipping">{t('shippingReturns')}</Link></li>
            <li><Link href="/faq">{t('faq')}</Link></li>
            <li><Link href="/size-guide">{t('sizeGuide')}</Link></li>
          </ul>
        </div>

        <div className={styles.newsletterBox}>
          <h3 className={styles.linkTitle}>{t('newsletter')}</h3>
          <p className={styles.newsletterDesc}>{t('newsletterDesc')}</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t('emailPlaceholder')} className={styles.input} />
            <button type="submit" className={styles.submitBtn}>{t('subscribe')}</button>
          </form>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.paymentRow}>
            <span className={styles.paymentBadge}>Mada</span>
            <span className={styles.paymentBadge}>Visa</span>
            <span className={styles.paymentBadge}>Mastercard</span>
            <span className={styles.paymentBadge}>Apple Pay</span>
            <span className={styles.paymentBadge}>Tamara</span>
            <span className={styles.paymentBadge}>COD</span>
          </div>
          <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
          <p className={styles.complianceRow}>
            {t('crNumber')} &nbsp;|&nbsp; {t('vatNumber')} &nbsp;|&nbsp; {t('maroof')}
          </p>
        </div>
      </div>
    </footer>
  );
}
