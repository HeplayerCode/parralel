import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light';
import styles from './SpottyModal.module.css';

interface SpottyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpottyModal: React.FC<SpottyModalProps> = ({ isOpen, onClose }) => {
  const mascotRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Load Spotty hero mascot animation in the modal
    if (mascotRef.current) {
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
      animRef.current?.destroy();
      animRef.current = lottie.loadAnimation({
        container: mascotRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: `${baseUrl}/stickers/spotty-intro.json`,
      });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="spotty-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          ×
        </button>

        <div className={styles.mascotArea}>
          <div
            ref={mascotRef}
            style={{ width: 120, height: 120, margin: '0 auto' }}
            aria-hidden="true"
          />
        </div>

        <h2 id="spotty-modal-title" className={styles.title}>
          Это Спотти
        </h2>
        <p className={styles.description}>
          Талисман образовательной платформы «ПАРАЛЛЕЛЬ».
        </p>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={onClose} autoFocus>
            Понятно
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
