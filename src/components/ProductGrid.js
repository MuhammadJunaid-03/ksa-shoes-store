"use client";
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SidebarFilter from './SidebarFilter';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ category }) {
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('featured');
  const { t } = useLanguage();

  // Filter by category if provided
  let filtered = category
    ? products.filter(p => p.category === category)
    : products;

  // Sort
  if (sortBy === 'priceLow') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHigh') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className={`container ${styles.layout}`}>
      <aside className={styles.sidebar}>
        <SidebarFilter onChange={(filters) => setActiveFilters(filters)} />
      </aside>
      <main className={styles.main}>
        <div className={styles.toolbar}>
          <span className={styles.resultCount}>{t('showing')} {filtered.length} {t('products')}</span>
          <select className={styles.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="featured">{t('featured')}</option>
            <option value="priceLow">{t('priceLowHigh')}</option>
            <option value="priceHigh">{t('priceHighLow')}</option>
          </select>
        </div>

        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
