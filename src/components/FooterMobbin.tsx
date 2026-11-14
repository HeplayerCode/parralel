import React from 'react';
import { AppRoute } from '../types';
import styles from './FooterMobbin.module.css';

interface FooterMobbinProps {
  onNavigate: (route: AppRoute) => void;
  onSwitchToClassic: () => void;
}

export const FooterMobbin: React.FC<FooterMobbinProps> = ({
  onNavigate,
  onSwitchToClassic,
}) => {
  return (
    <footer className={`${styles.footer} no-print`} role="contentinfo">
      <div className={styles.inner}>
        {/* Top 4-column Grid */}
        <div className={styles.topGrid}>
          {/* Col 1: Brand Lockup & System Status */}
          <div className={styles.brandCol}>
            <div
              className={styles.brandLockup}
              onClick={() => onNavigate('home')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              aria-label="На главную страницу"
            >
              <div className={styles.brandLogoRow}>
                <span className={styles.brandName}>ПАРАЛЛЕЛЬ</span>
                <span className={styles.brandTag}>v2.0</span>
              </div>
              <span className={styles.brandSub}>Mironov &amp; Kondratiev</span>
            </div>

            <p className={styles.brandDescription}>
              Интерактивный тренажёр по геометрии 7 класса. Наглядное изучение признаков параллельности
              прямых, исследование динамических чертежей и сертификация знаний.
            </p>

            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.statusText}>Все интерактивные модули активны</span>
            </div>
          </div>

          {/* Col 2: Simulator Modules */}
          <div className={styles.navCol}>
            <div className={styles.colTitle}>Разделы тренажёра</div>
            <nav className={styles.navList} aria-label="Разделы тренажёра">
              <button
                type="button"
                className={styles.navItem}
                onClick={() => onNavigate('theory')}
              >
                Теоретический курс
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => onNavigate('practice')}
              >
                Практическая тренировка (8 задач)
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => onNavigate('exam')}
              >
                Контрольный экзамен (10 вопросов)
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => onNavigate('results')}
              >
                Именной сертификат А4
              </button>
            </nav>
          </div>

          {/* Col 3: Theory & Geometry Knowledge */}
          <div className={styles.navCol}>
            <div className={styles.colTitle}>Геометрия 7 класс</div>
            <ul className={styles.linkList}>
              <li>
                <span className={styles.geoTopic}>Накрест лежащие углы (∠3 = ∠5)</span>
              </li>
              <li>
                <span className={styles.geoTopic}>Соответственные углы (∠1 = ∠5)</span>
              </li>
              <li>
                <span className={styles.geoTopic}>Односторонние углы (∑ = 180°)</span>
              </li>
              <li>
                <span className={styles.geoTopic}>Секущая и 8 образованных углов</span>
              </li>
              <li>
                <span className={styles.geoTopic}>Признаки параллельности прямых</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Authors & Contacts */}
          <div className={styles.navCol}>
            <div className={styles.colTitle}>Авторы и проект</div>
            <div className={styles.authorsList}>
              <a
                href="https://t.me/heplayer"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorCard}
              >
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>Никита Миронов</span>
                  <span className={styles.authorHandle}>@heplayer</span>
                </div>
                <span className={styles.arrowIcon} aria-hidden="true">↗</span>
              </a>

              <a
                href="https://t.me/baguette34"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorCard}
              >
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>Данил Кондратьев</span>
                  <span className={styles.authorHandle}>@baguette34</span>
                </div>
                <span className={styles.arrowIcon} aria-hidden="true">↗</span>
              </a>

              <div className={styles.emailContainer}>
                <span className={styles.emailLabel}>Контактный email:</span>
                <a href="mailto:mironov.nikita@itcollege59.ru" className={styles.emailLink}>
                  mironov.nikita@itcollege59.ru
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Tech Specs, Design Switcher */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            © 2026 ПАРАЛЛЕЛЬ. Mironov &amp; Kondratiev • IT-Колледж
          </div>

          <div className={styles.engineTag}>
            React 18 • TypeScript • SVG Geometry Engine
          </div>

          <div className={styles.switcherWrapper}>
            <button
              type="button"
              className={styles.switchButton}
              onClick={onSwitchToClassic}
              title="Переключить обратно на классическое оформление"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C10.5 2.5 12.6 4.15 13.25 6.5M13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C5.5 13.5 3.4 11.85 2.75 9.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path d="M14 4V7H11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12V9H5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Вернуть классический дизайн</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
