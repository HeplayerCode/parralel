import React from 'react';
import { AppRoute } from '../types';
import styles from './Header.module.css';

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  isUnlocked: boolean;
  onOpenLogin: () => void;
  onOpenGetAccess: () => void;
  onRevokeAccess: () => void;
  designMode?: 'modern' | 'classic';
  onToggleDesignMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  isUnlocked,
  onOpenLogin,
  onOpenGetAccess,
  onRevokeAccess,
  designMode = 'modern',
  onToggleDesignMode,
}) => {
  return (
    <header className={`${styles.header} no-print`} role="banner">
      <div className={styles.inner}>
        <div
          className={styles.brandGroup}
          onClick={() => onNavigate('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('home');
            }
          }}
          aria-label="На главную страницу ПАРАЛЛЕЛЬ"
        >
          <span className={styles.brandName}>ПАРАЛЛЕЛЬ</span>
          <span className={styles.brandAuthors}>by Mironov &amp; Kondratiev</span>
        </div>

        <nav className={styles.nav} aria-label="Основная навигация">
          <button
            className={`${styles.navLink} ${currentRoute === 'theory' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('theory')}
          >
            Теория
          </button>
          <button
            className={`${styles.navLink} ${currentRoute === 'practice' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('practice')}
          >
            Тренировка
          </button>
          <button
            className={`${styles.navLink} ${currentRoute === 'exam' || currentRoute === 'results' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('exam')}
          >
            Экзамен
          </button>
        </nav>

        <div className={styles.actions}>
          {onToggleDesignMode && (
            <button
              type="button"
              className={styles.designToggleBtn}
              onClick={onToggleDesignMode}
              title={designMode === 'modern' ? 'Переключить на классический вид' : 'Включить современный дизайн Mobbin'}
              aria-label={`Текущий режим: ${designMode === 'modern' ? 'Mobbin' : 'Классика'}. Нажмите для смены.`}
            >
              <span className={styles.designToggleDot} aria-hidden="true" />
              <span>{designMode === 'modern' ? 'Mobbin' : 'Классика'}</span>
            </button>
          )}

          {isUnlocked ? (
            <>
              <div className={styles.accessBadge} title="Доступ к тренажёру подтверждён">
                <span className={styles.statusDot} aria-hidden="true" />
                <span>Доступ активен</span>
              </div>
              <button
                className={styles.btnTextOnly}
                onClick={onRevokeAccess}
                title="Сбросить код доступа"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.btnSecondary}
                onClick={onOpenLogin}
                type="button"
              >
                Вход
              </button>
              <button
                className={styles.btnPrimary}
                onClick={onOpenGetAccess}
                type="button"
              >
                Получить доступ
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
