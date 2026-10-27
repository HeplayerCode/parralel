import React, { useState } from 'react';
import { AppRoute, ExamResult } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';
import styles from './CertificateView.module.css';

interface CertificateViewProps {
  result: ExamResult | null;
  onNavigate: (route: AppRoute) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  result,
  onNavigate,
}) => {
  const [studentName, setStudentName] = useState<string>(() => {
    return getStorageItem<string>('parallel_student_name', '');
  });
  const [isEditingName, setIsEditingName] = useState<boolean>(!studentName.trim());
  const [tempName, setTempName] = useState<string>(studentName);

  if (!result || !result.passed) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.nameCard}>
          <h2 className={styles.nameTitle}>Сертификат недоступен</h2>
          <p className={styles.nameDescription}>
            Сертификат выдаётся после успешного прохождения итогового экзамена с результатом не менее 70%.
          </p>
          <button
            className={styles.btnPrint}
            onClick={() => onNavigate('exam')}
          >
            Сдать экзамен
          </button>
        </div>
      </div>
    );
  }

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    const clean = tempName.trim();
    setStudentName(clean);
    setStorageItem('parallel_student_name', clean);
    setIsEditingName(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate deterministic certificate serial id from date and score
  const certSerial = `PAR-2026-${result.percentage}-${result.correctAnswers}`;

  return (
    <div className={styles.wrapper}>
      {/* Top action bar (hidden during print) */}
      <div className={`${styles.controlsBar} no-print`}>
        <div className={styles.controlsLeft}>
          <span className={styles.controlsTitle}>Сертификат об окончании</span>
        </div>

        <div className={styles.controlsRight}>
          <button
            className={styles.btnSecondary}
            onClick={() => setIsEditingName(true)}
          >
            Изменить имя
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => onNavigate('results')}
          >
            К результатам
          </button>
          <button
            className={styles.btnPrint}
            onClick={handlePrint}
          >
            Печать / Сохранить PDF
          </button>
        </div>
      </div>

      {/* Name Input Dialog if needed */}
      {isEditingName ? (
        <div className={`${styles.nameCard} no-print`}>
          <h2 className={styles.nameTitle}>Данные для сертификата</h2>
          <p className={styles.nameDescription}>
            Введите ваше имя и фамилию в именительном падеже, как они будут указаны на сертификате.
          </p>

          <form onSubmit={handleSaveName} className={styles.nameForm}>
            <input
              type="text"
              className={styles.nameInput}
              placeholder="Например: Никита Миронов"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              autoFocus
              required
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                className={styles.btnPrint}
                disabled={!tempName.trim()}
              >
                Сохранить и показать сертификат
              </button>
              {studentName && (
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setIsEditingName(false)}
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        /* Printable 1-page A4 Certificate */
        <article className={styles.certificateContainer}>
          <div className={styles.certificateInnerFrame} aria-hidden="true" />

          {/* Certificate Header */}
          <div className={styles.certHeader}>
            <div className={styles.certBrand}>
              <div className={styles.certLogo}>ПАРАЛЛЕЛЬ</div>
              <div className={styles.certAuthors}>by Mironov &amp; Kondratiev</div>
            </div>

            <div className={styles.certBadgeRight}>
              <span className={styles.certDocumentType}>СЕРТИФИКАТ</span>
              <span className={styles.certId}>ID: {certSerial}</span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className={styles.certBody}>
            <div className={styles.certPreRecipient}>
              Настоящий сертификат подтверждает, что
            </div>

            <div className={styles.certRecipientName}>{studentName}</div>

            <p className={styles.certDescription}>
              успешно завершил(а) курс и сдал(а) итоговый квалификационный экзамен по теме
              «Свойства параллельных прямых и углы, образованные секущей» интерактивного образовательного
              тренажёра по геометрии.
            </p>

            <div className={styles.certMetaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Итоговый результат</span>
                <span className={styles.metaValue}>
                  {result.percentage}% ({result.correctAnswers} из {result.totalQuestions})
                </span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Дата прохождения</span>
                <span className={styles.metaValue}>{result.completedAt}</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Учебная дисциплина</span>
                <span className={styles.metaValue}>Геометрия</span>
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className={styles.certFooter}>
            <p className={styles.certDisclaimer}>
              Сертификат является подтверждением успешного прохождения учебного образовательного
              тренажёра «ПАРАЛЛЕЛЬ» и не является официальным документом государственного образца.
            </p>

            <div className={styles.certSignature}>
              <span className={styles.signLine}>Никита Миронов &amp; Данил Кондратьев</span>
              <span className={styles.signRole}>Авторы тренажёра</span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
