"use client";
import styles from './DevBadge.module.css';

export default function DevBadge() {
  return (
    <div className={styles.badge}>
      <span className={styles.emoji}>🎮</span>
      <span className={styles.text}>
        Designed & Developed by
        <span className={styles.name}> Johny</span>
        <span className={styles.title}> the Game Developer</span>
      </span>
      <span className={styles.emoji}>⚡</span>
    </div>
  );
}
