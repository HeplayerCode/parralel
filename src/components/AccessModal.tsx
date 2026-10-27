import React, { useState, useEffect, useRef } from 'react';
import { verifyAccessCode } from '../utils/auth';
import { SpottySticker } from './SpottySticker';
import styles from './Modal.module.css';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRequestAccess: () => void;
}

export const AccessModal: React.FC<AccessModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onRequestAccess,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Пожалуйста, введите код доступа.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const isValid = await verifyAccessCode(code);
      if (isValid) {
        onSuccess();
        onClose();
      } else {
        setError('Неверный код доступа. Проверьте правильность ввода или запросите новый код.');
      }
    } catch {
      setError('Произошла ошибка при проверке кода. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="access-modal-title"
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
          <h2 id="access-modal-title" className={styles.title}>
            Вход в тренажёр
          </h2>
          <p className={styles.description}>
            Введите персональный код доступа, выданный преподавателем или отправленный по почте.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="access-code-input" className={styles.label}>
              Код доступа
            </label>
            <input
              id="access-code-input"
              ref={inputRef}
              type="text"
              autoComplete="off"
              spellCheck="false"
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              placeholder="PARALLEL-XXXX"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError('');
              }}
              aria-invalid={!!error}
              aria-describedby={error ? 'access-code-error' : undefined}
            />
            {error && (
              <div id="access-code-error" className={styles.errorMessage} role="alert">
                {error}
              </div>
            )}
          </div>

          <div className={styles.footerActions}>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isSubmitting || !code.trim()}
            >
              {isSubmitting ? 'Проверка...' : 'Подтвердить код'}
            </button>
            <button
              type="button"
              className={styles.btnSecondaryAction}
              onClick={() => {
                onClose();
                onRequestAccess();
              }}
            >
              У меня нет кода доступа
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
