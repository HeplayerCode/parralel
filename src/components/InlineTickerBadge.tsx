import React, { useState, useEffect, useRef } from 'react';
import styles from './InlineTickerBadge.module.css';

export interface TickerItem {
  id: string;
  label: string;
  badge: string;
  icon: 'parallel' | 'alternate' | 'corresponding' | 'consecutive' | 'transversal';
}

const ITEMS: TickerItem[] = [
  {
    id: 'parallel',
    label: 'Параллельные a ∥ b',
    badge: 'не пересекаются',
    icon: 'parallel',
  },
  {
    id: 'alternate',
    label: 'Накрест лежащие ∠3 = ∠5',
    badge: 'равны',
    icon: 'alternate',
  },
  {
    id: 'corresponding',
    label: 'Соответственные ∠1 = ∠5',
    badge: 'равны',
    icon: 'corresponding',
  },
  {
    id: 'consecutive',
    label: 'Односторонние ∠3 + ∠6',
    badge: '180°',
    icon: 'consecutive',
  },
  {
    id: 'transversal',
    label: 'Секущая прямая c',
    badge: '8 углов',
    icon: 'transversal',
  },
];

interface InlineTickerBadgeProps {
  onSelect?: (item: TickerItem) => void;
}

export const InlineTickerBadge: React.FC<InlineTickerBadgeProps> = ({ onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentItem = ITEMS[currentIndex];

  const advanceToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % ITEMS.length;
        if (onSelect) onSelect(ITEMS[next]);
        return next;
      });
      setIsAnimating(false);
    }, 240);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      advanceToNext();
    }, 2800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const renderIcon = (type: TickerItem['icon']) => {
    switch (type) {
      case 'parallel':
        return (
          <svg
            className={styles.iconSvg}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <line x1="2" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'alternate':
        return (
          <svg
            className={styles.iconSvg}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 4H13L3 12H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'corresponding':
        return (
          <svg
            className={styles.iconSvg}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 3V13M4 3H12M4 8H10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'consecutive':
        return (
          <svg
            className={styles.iconSvg}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 4H5C3.89543 4 3 4.89543 3 6V10C3 11.1046 3.89543 12 5 12H12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      case 'transversal':
      default:
        return (
          <svg
            className={styles.iconSvg}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
            <line x1="2" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
            <line x1="4" y1="14" x2="12" y2="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <button
      type="button"
      className={`${styles.tickerBadge} ${isAnimating ? styles.animating : ''}`}
      onClick={advanceToNext}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title="Нажмите, чтобы переключить геометрическое свойство"
      aria-label={`Текущее свойство: ${currentItem.label}, ${currentItem.badge}. Нажмите для переключения.`}
    >
      <span className={styles.iconContainer}>
        {renderIcon(currentItem.icon)}
      </span>
      <span className={styles.labelWrapper}>
        <span className={styles.labelText}>{currentItem.label}</span>
      </span>
      <span className={styles.badgeMeta}>{currentItem.badge}</span>
      <span className={styles.chevronIcon} aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
};
