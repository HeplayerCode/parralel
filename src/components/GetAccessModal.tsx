import React, { useEffect } from 'react';
import { SpottySticker } from './SpottySticker';
import styles from './Modal.module.css';

interface GetAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export const GetAccessModal: React.FC<GetAccessModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const email = 'mironov.nikita@itcollege59.ru';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    'Запрос кода доступа к тренажёру ПАРАЛЛЕЛЬ'
  )}&body=${encodeURIComponent(
    'Здравствуйте! Прошу предоставить код доступа к образовательному тренажёру по геометрии «ПАРАЛЛЕЛЬ».'
  )}`;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="get-access-modal-title"
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ×
        </button>

        <div className={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <SpottySticker type="access" size={88} interactive={false} />
          </div>
          <h2 id="get-access-modal-title" className={styles.title}>
            Получить доступ
          </h2>
          <p className={styles.description}>
            Чтобы получить код доступа к тренажёру, свяжитесь с нами по электронной почте.
          </p>
        </div>

        <div className={styles.contactBox}>
          <span className={styles.contactLabel}>Электронная почта</span>
          <a href={mailtoLink} className={styles.contactEmail}>
            {email}
          </a>
        </div>

        <div className={styles.footerActions}>
          <a
            href={mailtoLink}
            className={styles.btnSubmit}
            role="button"
          >
            Написать на почту
          </a>
          <button
            type="button"
            className={styles.btnSecondaryAction}
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
          >
            У меня уже есть код
          </button>
        </div>
      </div>
    </div>
  );
};
