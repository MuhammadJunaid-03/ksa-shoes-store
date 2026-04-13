"use client";
import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useInventory } from '@/context/InventoryContext';
import ProductCard from '@/components/ProductCard';
import styles from './ProductDetail.module.css';

// Try importing reviews data — fallback to empty if not yet created
let getProductReviews, getAverageRating, getFitPercentage;
try {
  const reviewsModule = require('@/data/reviews');
  getProductReviews = reviewsModule.getProductReviews;
  getAverageRating = reviewsModule.getAverageRating;
  getFitPercentage = reviewsModule.getFitPercentage;
} catch {
  getProductReviews = null;
  getAverageRating = null;
  getFitPercentage = null;
}

// ─── Hardcoded review data (fallback when reviews.js doesn't exist) ──
const FALLBACK_REVIEWS = [
  {
    id: 1,
    name: "Mohammed A.",
    rating: 5,
    title: "Exceptional quality",
    body: "The craftsmanship is outstanding. I've been wearing these daily for two months and they still look brand new. The leather has developed a beautiful patina.",
    date: "2024-12-15",
    verified: true,
    fit: "True to size",
  },
  {
    id: 2,
    name: "Khalid R.",
    rating: 5,
    title: "Perfect for Jummah",
    body: "These sandals are comfortable from the first wear. No breaking in needed. I receive compliments every Friday at the masjid.",
    date: "2024-11-28",
    verified: true,
    fit: "True to size",
  },
  {
    id: 3,
    name: "Ahmed S.",
    rating: 4,
    title: "Great sandals, slightly narrow",
    body: "Beautiful design and premium feel. I have wide feet so I went half a size up which worked perfectly. The gold buckle detail is elegant.",
    date: "2024-11-10",
    verified: true,
    fit: "Runs narrow",
  },
  {
    id: 4,
    name: "Faisal M.",
    rating: 5,
    title: "Worth every riyal",
    body: "I was hesitant about the price but these are genuinely premium. The packaging was beautiful too — felt like a luxury unboxing experience.",
    date: "2024-10-22",
    verified: true,
    fit: "True to size",
  },
  {
    id: 5,
    name: "Omar K.",
    rating: 4,
    title: "Solid everyday sandal",
    body: "Good quality leather, comfortable cushioning. The sole provides great grip even on marble floors. Only wish they had more color options.",
    date: "2024-10-05",
    verified: false,
    fit: "True to size",
  },
];

const FALLBACK_BREAKDOWN = { 5: 15, 4: 6, 3: 2, 2: 1, 1: 0 };

// ─── Star SVG component ──────────────────────────────────────
function StarIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function StarRating({ rating, size = 16, className = '' }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className={`${styles.stars} ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className={styles.starFilled}><StarIcon size={size} /></span>
      ))}
      {hasHalf && (
        <span key="half" className={styles.starHalf}>
          <StarIcon size={size} />
          <span className={styles.starHalfFilled} style={{ width: '50%' }}>
            <StarIcon size={size} />
          </span>
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className={styles.starEmpty}><StarIcon size={size} /></span>
      ))}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function ProductDetail({ productId }) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { getStock, isInStock, hasLowStock } = useInventory();

  const product = useMemo(() => products.find(p => p.id === productId), [productId]);

  // State
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0); // 0 = description open by default
  const [showAddedToast, setShowAddedToast] = useState(false);

  // Reviews
  const reviews = useMemo(() => {
    if (getProductReviews && product) {
      return getProductReviews(product.id);
    }
    return FALLBACK_REVIEWS;
  }, [product]);

  const avgRating = useMemo(() => {
    if (getAverageRating && product) {
      return getAverageRating(product.id);
    }
    return 4.8;
  }, [product]);

  const fitPct = useMemo(() => {
    if (getFitPercentage && product) {
      return getFitPercentage(product.id);
    }
    return 89;
  }, [product]);

  const totalReviews = reviews?.length || 24;
  const breakdown = FALLBACK_BREAKDOWN;
  const breakdownTotal = Object.values(breakdown).reduce((a, b) => a + b, 0);

  // Related products — same brand or random, excluding current
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameBrand = products.filter(p => p.id !== product.id && p.brand === product.brand);
    const others = products.filter(p => p.id !== product.id && p.brand !== product.brand);
    return [...sameBrand, ...others].slice(0, 4);
  }, [product]);

  // Stock for selected variant
  const selectedStock = useMemo(() => {
    if (!product || !selectedSize || !selectedColor) return 0;
    return getStock(product.id, selectedSize, selectedColor);
  }, [product, selectedSize, selectedColor, getStock]);

  // Can add to bag?
  const canAdd = product && selectedSize && selectedColor && selectedStock > 0 && quantity <= selectedStock;

  // Handlers
  const handleAddToBag = useCallback(() => {
    if (!canAdd) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
    setQuantity(1);
  }, [canAdd, quantity, product, selectedSize, selectedColor, addToCart]);

  const handleAccordionToggle = useCallback((index) => {
    setOpenAccordion(prev => prev === index ? -1 : index);
  }, []);

  // Not found
  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Product Not Found</h1>
          <p className={styles.notFoundText}>The product you are looking for does not exist or has been removed.</p>
          <Link href="/" className={styles.notFoundLink}>
            {t('backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = product.category || t('arabicSandals');
  const savePercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const tamaraInstallment = Math.ceil(product.price / 3);
  const productInStock = isInStock(product.id);

  // Badge
  const getBadge = () => {
    if (!productInStock) return { text: t('soldOut'), cls: styles.badgeSoldOut };
    if (product.isLimitedEdition) return { text: 'Limited Edition', cls: styles.badgeLimited };
    if (product.isNew) return { text: 'New', cls: styles.badgeNew };
    if (product.isBestseller) return { text: 'Bestseller', cls: styles.badgeBestseller };
    return null;
  };
  const badge = getBadge();

  return (
    <div className={styles.container}>
      {/* ─── Two-Column Layout ──────────────────────────── */}
      <div className={styles.twoCol}>
        {/* ─── Left: Image Gallery ─────────────────────── */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrap}>
            {badge && (
              <div className={`${styles.imageBadge} ${badge.cls}`}>
                {badge.text}
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>

          {/* Thumbnail strip — gallery-ready UI */}
          <div className={styles.thumbnailStrip}>
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                className={`${styles.thumbnail} ${activeThumb === idx ? styles.thumbnailActive : ''}`}
                onClick={() => setActiveThumb(idx)}
              >
                <img src={product.image} alt={`${product.name} view ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ─── Right: Product Info ──────────────────────── */}
        <div className={styles.infoSection}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>&rsaquo;</span>
            <Link href="/sandals">{categoryName}</Link>
            <span className={styles.breadcrumbSep}>&rsaquo;</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </nav>

          {/* Brand */}
          <div className={styles.brand}>{product.brand}</div>

          {/* Product Name */}
          <h1 className={styles.productName}>{product.name}</h1>

          {/* Rating */}
          <div className={styles.rating}>
            <StarRating rating={avgRating} size={16} />
            <span className={styles.ratingText}>{avgRating}</span>
            <span className={styles.ratingCount}>({totalReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className={styles.priceRow}>
            <span className={styles.price}>{product.currency} {product.price}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>{product.currency} {product.originalPrice}</span>
            )}
            {savePercent > 0 && (
              <span className={styles.saveBadge}>SAVE {savePercent}%</span>
            )}
          </div>

          {/* Tamara */}
          <div className={styles.tamara}>
            or 3 interest-free payments of <span>{product.currency} {tamaraInstallment}</span> with Tamara
          </div>

          {/* VAT */}
          <div className={styles.vat}>Inclusive of 15% VAT</div>

          {/* Color Selection */}
          <div className={styles.colorSection}>
            <div className={styles.sectionLabel}>
              Color: <span className={styles.sectionLabelValue}>{selectedColor}</span>
            </div>
            <div className={styles.colorSwatches}>
              {product.colors.map((color, i) => (
                <button
                  key={color}
                  className={`${styles.colorSwatch} ${selectedColor === color ? styles.colorActive : ''}`}
                  style={{ backgroundColor: product.colorHex[i] }}
                  title={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedSize(null);
                    setQuantity(1);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeLabelRow}>
              <div className={styles.sectionLabel}>
                Size (EU):
              </div>
              <span className={styles.sizeGuideLink}>Size Guide</span>
            </div>
            <div className={styles.sizePills}>
              {product.sizes.map((size) => {
                const stock = getStock(product.id, size, selectedColor);
                const isOutOfStock = stock <= 0;
                const isActive = selectedSize === size;
                return (
                  <button
                    key={size}
                    className={`${styles.sizePill} ${isActive ? styles.sizeActive : ''} ${isOutOfStock ? styles.sizeDisabled : ''}`}
                    onClick={() => {
                      if (isOutOfStock) return;
                      setSelectedSize(size);
                      setQuantity(1);
                    }}
                    disabled={isOutOfStock}
                    title={isOutOfStock ? 'Out of stock' : `${stock} available`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <div className={styles.fitNote}>
              True to size — based on {fitPct}% of reviews
            </div>
          </div>

          {/* Quantity */}
          <div className={styles.quantitySection}>
            <div className={styles.sectionLabel}>Quantity:</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={styles.quantityRow}>
                <button
                  className={`${styles.qtyBtn} ${quantity <= 1 ? styles.qtyBtnDisabled : ''}`}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <div className={styles.qtyValue}>{quantity}</div>
                <button
                  className={`${styles.qtyBtn} ${quantity >= selectedStock ? styles.qtyBtnDisabled : ''}`}
                  onClick={() => setQuantity(q => Math.min(selectedStock || 1, q + 1))}
                  disabled={quantity >= selectedStock}
                >
                  +
                </button>
              </div>
              {selectedSize && selectedStock > 0 && selectedStock <= 5 && (
                <span className={`${styles.stockNote} ${styles.stockNoteLow}`}>
                  Only {selectedStock} left
                </span>
              )}
            </div>
          </div>

          {/* Add to Bag */}
          <button
            className={`${styles.addToBag} ${!canAdd ? styles.addToBagDisabled : ''}`}
            onClick={handleAddToBag}
            disabled={!canAdd}
          >
            {!productInStock
              ? t('soldOut')
              : !selectedSize
              ? 'Select a Size'
              : 'Add to Bag'}
          </button>

          {/* Wishlist */}
          <button className={styles.wishlistBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Add to Wishlist
          </button>

          {/* Trust Signals */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🚚</span>
              Free delivery — Riyadh &amp; Jeddah
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🔄</span>
              Free 30-day returns
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              Authenticity guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* ─── Accordion Sections ──────────────────────────── */}
      <div className={styles.accordionSection}>
        {/* Description */}
        <div className={styles.accordion}>
          <button
            className={styles.accordionHeader}
            onClick={() => handleAccordionToggle(0)}
          >
            <span>Description</span>
            <span className={`${styles.accordionIcon} ${openAccordion === 0 ? styles.accordionIconOpen : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>
          {openAccordion === 0 && (
            <div className={styles.accordionBody}>
              {product.description}
            </div>
          )}
        </div>

        {/* Materials & Care */}
        <div className={styles.accordion}>
          <button
            className={styles.accordionHeader}
            onClick={() => handleAccordionToggle(1)}
          >
            <span>Materials &amp; Care</span>
            <span className={`${styles.accordionIcon} ${openAccordion === 1 ? styles.accordionIconOpen : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>
          {openAccordion === 1 && (
            <div className={styles.accordionBody}>
              <div className={styles.materialsGrid}>
                <span className={styles.materialsLabel}>Upper:</span>
                <span className={styles.materialsValue}>Premium Italian leather</span>
                <span className={styles.materialsLabel}>Sole:</span>
                <span className={styles.materialsValue}>Durable rubber with grip pattern</span>
                <span className={styles.materialsLabel}>Lining:</span>
                <span className={styles.materialsValue}>Soft leather lining</span>
                <span className={styles.materialsLabel}>Hardware:</span>
                <span className={styles.materialsValue}>Gold-tone brushed metal</span>
                <span className={styles.materialsLabel}>Care:</span>
                <span className={styles.materialsValue}>Clean with a soft dry cloth. Apply leather conditioner monthly. Store in the provided dust bag away from direct sunlight.</span>
              </div>
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div className={styles.accordion}>
          <button
            className={styles.accordionHeader}
            onClick={() => handleAccordionToggle(2)}
          >
            <span>Shipping &amp; Returns</span>
            <span className={`${styles.accordionIcon} ${openAccordion === 2 ? styles.accordionIconOpen : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>
          {openAccordion === 2 && (
            <div className={styles.accordionBody}>
              <div className={styles.shippingList}>
                <div className={styles.shippingItem}>
                  <span>🚚</span>
                  <span><strong>Riyadh &amp; Jeddah:</strong> Free same-day delivery on orders before 2 PM</span>
                </div>
                <div className={styles.shippingItem}>
                  <span>📦</span>
                  <span><strong>Rest of KSA:</strong> Free standard delivery (2-4 business days)</span>
                </div>
                <div className={styles.shippingItem}>
                  <span>🌍</span>
                  <span><strong>International:</strong> Available to GCC countries. Rates calculated at checkout.</span>
                </div>
                <div className={styles.shippingItem}>
                  <span>🔄</span>
                  <span><strong>Returns:</strong> Free returns within 30 days. Items must be unworn with original tags and packaging.</span>
                </div>
                <div className={styles.shippingItem}>
                  <span>💳</span>
                  <span><strong>Payment:</strong> Visa, Mastercard, Mada, Apple Pay, Tamara (Buy Now Pay Later)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── You May Also Like ───────────────────────────── */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You May Also Like</h2>
          <p className={styles.relatedSubtitle}>Handpicked for your taste</p>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* ─── Customer Reviews ────────────────────────────── */}
      <div className={styles.reviewsSection}>
        <h2 className={styles.relatedTitle}>Customer Reviews</h2>
        <p className={styles.relatedSubtitle}>What our customers say</p>

        <div className={styles.reviewsHeader}>
          {/* Aggregate */}
          <div className={styles.reviewsOverview}>
            <div className={styles.reviewsBigNumber}>{avgRating}</div>
            <StarRating rating={avgRating} size={18} />
            <div className={styles.reviewsTotalText}>Based on {totalReviews} reviews</div>
          </div>

          {/* Breakdown bars */}
          <div className={styles.reviewsBreakdown}>
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>{star}</span>
                <StarIcon size={12} />
                <div className={styles.breakdownBar}>
                  <div
                    className={styles.breakdownFill}
                    style={{ width: `${breakdownTotal > 0 ? (breakdown[star] / breakdownTotal * 100) : 0}%` }}
                  />
                </div>
                <span className={styles.breakdownCount}>{breakdown[star]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewCardTop}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerAvatar}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className={styles.reviewerName}>{review.name}</div>
                    {review.verified && (
                      <span className={styles.verifiedBadge}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <div className={styles.reviewStars}>
                <StarRating rating={review.rating} size={14} />
              </div>
              {review.title && (
                <div className={styles.reviewTitle}>{review.title}</div>
              )}
              <div className={styles.reviewBody}>{review.body}</div>
              {review.fit && (
                <div className={styles.reviewFit}>
                  👟 {review.fit}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Mobile Sticky Add-to-Bag Bar ────────────────── */}
      <div className={styles.mobileBar}>
        <div className={styles.mobileBarPrice}>
          <span className={styles.mobileBarPriceMain}>{product.currency} {product.price}</span>
          {product.originalPrice && (
            <span className={styles.mobileBarPriceOld}>{product.currency} {product.originalPrice}</span>
          )}
        </div>
        <button
          className={`${styles.mobileBarBtn} ${!canAdd ? styles.mobileBarBtnDisabled : ''}`}
          onClick={handleAddToBag}
          disabled={!canAdd}
        >
          {!productInStock
            ? t('soldOut')
            : !selectedSize
            ? 'Select Size'
            : 'Add to Bag'}
        </button>
      </div>

      {/* Added toast */}
      {showAddedToast && (
        <div className={styles.addedToast}>
          <div className={styles.addedToastIcon}>✓</div>
          <div className={styles.addedToastText}>{t('addedToCart')}</div>
        </div>
      )}
    </div>
  );
}
