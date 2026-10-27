import React, { useState } from 'react';
import { AppRoute, ExamResult } from '../types';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import { GeometricDiagram } from './GeometricDiagram';
import { setStorageItem } from '../utils/storage';
import styles from './ExamView.module.css';

interface ExamViewProps {
  onNavigate: (route: AppRoute) => void;
  onExamComplete: (result: ExamResult) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ onNavigate, onExamComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const total = EXAM_QUESTIONS.length;
  const currentQuestion = EXAM_QUESTIONS[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const answeredCount = Object.keys(answers).length;

  const handleSubmitExam = () => {
    let correctCount = 0;
    const recordedAnswers = EXAM_QUESTIONS.map((q, idx) => {
      const selected = answers[idx] ?? -1;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedIndex: selected,
        isCorrect,
      };
    });

    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 70;

    const result: ExamResult = {
      totalQuestions: total,
      correctAnswers: correctCount,
      percentage,
      passed,
      answers: recordedAnswers,
      completedAt: new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    setStorageItem('parallel_last_exam_result', result);
    setShowConfirmModal(false);
    onExamComplete(result);
    onNavigate('results');
  };

  return (
    <div className={styles.container}>
      {/* Top Header & Question Palette */}
      <div className={styles.topBar}>
        <div className={styles.titleArea}>
          <h1 className={styles.examTitle}>Экзамен по геометрии</h1>
          <span className={styles.examSubtitle}>
            Отвечено {answeredCount} из {total} вопросов. Порог сдачи — 70%.
          </span>
        </div>

        <div className={styles.questionPalette} role="tablist" aria-label="Вопросы экзамена">
          {EXAM_QUESTIONS.map((_, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = answers[idx] !== undefined;

            let btnClass = styles.paletteBtn;
            if (isCurrent) btnClass += ` ${styles.paletteBtnActive}`;
            if (isAnswered) btnClass += ` ${styles.paletteBtnAnswered}`;

            return (
              <button
                key={idx}
                className={btnClass}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Вопрос ${idx + 1}${isAnswered ? ', отвечен' : ''}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card: 2-column layout on wide screens */}
      <div key={currentIndex} className={styles.questionCard}>
        <div className={styles.cardLayout}>
          {/* Left Column: Task & Diagram */}
          <div className={styles.taskSide}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>
                Вопрос {currentIndex + 1} из {total}
              </span>
              <h2 className={styles.questionTitle}>{currentQuestion.title}</h2>
              <p className={styles.questionPrompt}>{currentQuestion.prompt}</p>
            </div>

            <div className={styles.diagramWrapper}>
              <GeometricDiagram config={currentQuestion.diagram} />
            </div>
          </div>

          {/* Right Column: Options & Navigation */}
          <div className={styles.interactionSide}>
            <div className={styles.optionsList} role="radiogroup" aria-label="Варианты ответа">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    className={`${styles.optionBtn} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => handleSelectOption(idx)}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <div
                      className={`${styles.optionRadio} ${
                        isSelected ? styles.optionRadioActive : ''
                      }`}
                    />
                    <span className={styles.optionText}>{option}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.bottomNavigation}>
              <div className={styles.navGroup}>
                <button
                  className={styles.btnSecondary}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                >
                  ← Назад
                </button>
                <button
                  className={styles.btnSecondary}
                  onClick={() => setCurrentIndex((prev) => Math.min(total - 1, prev + 1))}
                  disabled={currentIndex === total - 1}
                >
                  Вперёд →
                </button>
              </div>

              <button
                className={styles.btnFinish}
                onClick={() => setShowConfirmModal(true)}
              >
                Завершить экзамен
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-finish-title"
        >
          <div className={styles.confirmBox}>
            <h3 id="confirm-finish-title" className={styles.confirmTitle}>
              Завершение экзамена
            </h3>
            <p className={styles.confirmText}>
              Вы ответили на {answeredCount} из {total} вопросов.
              {answeredCount < total &&
                ' Неотвеченные вопросы будут засчитаны как неверные.'}{' '}
              Вы уверены, что хотите завершить экзамен и рассчитать результаты?
            </p>
            <div className={styles.confirmActions}>
              <button
                className={styles.btnFinish}
                onClick={handleSubmitExam}
              >
                Да, завершить
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => setShowConfirmModal(false)}
              >
                Вернуться к вопросам
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
