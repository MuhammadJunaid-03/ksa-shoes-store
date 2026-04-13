"use client";
import styles from './ReviewsSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

const reviews = [
  {
    nameKey: 'reviewer1Name',
    name: 'Mohammed Al-Rashid',
    nameAr: 'محمد الراشد',
    textKey: 'review1Text',
  },
  {
    nameKey: 'reviewer2Name',
    name: 'Fahad Al-Otaibi',
    nameAr: 'فهد العتيبي',
    textKey: 'review2Text',
  },
  {
    nameKey: 'reviewer3Name',
    name: 'Khalid Al-Harbi',
    nameAr: 'خالد الحربي',
    textKey: 'review3Text',
  },
];

export default function ReviewsSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className="gold-divider"></div>
        <h2 className="section-title">{t('reviewsTitle')}</h2>
        <p className="section-subtitle">{t('reviewsTrust')}</p>
      </div>

      <div className={styles.grid}>
        {reviews.map((review, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>"{t(review.textKey)}"</p>
            <div className={styles.reviewer}>
              <div>
                <div className={styles.reviewerName}>{t(review.nameKey)}</div>
                <div className={styles.verified}>✓ {t('verifiedBuyer')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.aggregate}>
        <span className={styles.aggregateStars}>{t('reviewsAggregate')}</span>
      </div>
    </section>
  );
}
