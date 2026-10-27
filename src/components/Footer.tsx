import React from 'react';
import { AppRoute } from '../types';
import styles from './Footer.module.css';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className={`${styles.footer} no-print`} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          {/* Brand & Mission */}
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
              style={{ cursor: 'pointer' }}
              aria-label="На главную страницу"
            >
              <span className={styles.brandName}>ПАРАЛЛЕЛЬ</span>
              <span className={styles.brandAuthors}>by Mironov &amp; Kondratiev</span>
            </div>
            <p className={styles.brandDesc}>
              Интерактивный образовательный тренажёр по геометрии.
              Теория, векторные чертежи, отработка задач и контрольный экзамен.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className={styles.navCol}>
            <div className={styles.colTitle}>Разделы</div>
            <nav className={styles.navList} aria-label="Навигация в подвале">
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => onNavigate('theory')}
              >
                Теоретический курс
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => onNavigate('practice')}
              >
                Практическая тренировка
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => onNavigate('exam')}
              >
                Итоговый экзамен
              </button>
            </nav>
          </div>

          {/* Authors Telegram Contacts */}
          <div className={styles.contactsCol}>
            <div className={styles.colTitle}>Связь с авторами</div>
            <div className={styles.contactCards}>
              <a
                href="https://t.me/heplayer"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.contactName}>Никита Миронов</span>
                <span className={styles.contactTg}>@heplayer</span>
              </a>

              <a
                href="https://t.me/baguette34"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={styles.contactName}>Данил Кондратьев</span>
                <span className={styles.contactTg}>@baguette34</span>
              </a>
            </div>

            <div className={styles.emailLine}>
              <span>Почта:</span>
              <a
                href="mailto:mironov.nikita@itcollege59.ru"
                className={styles.emailLink}
              >
                mironov.nikita@itcollege59.ru
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className={styles.bottomRow}>
          <div className={styles.copyright}>
            © 2026 ПАРАЛЛЕЛЬ. Образовательный тренажёр по геометрии.
          </div>
          <div className={styles.authorsTag}>
            Mironov &amp; Kondratiev
          </div>
        </div>
      </div>
    </footer>
  );
};
