import React, { useState } from 'react';
import { AppRoute } from '../types';
import { PRACTICE_QUESTIONS } from '../data/practiceQuestions';
import { GeometricDiagram } from './GeometricDiagram';
import { SpottySticker } from './SpottySticker';
import styles from './PracticeView.module.css';

interface PracticeViewProps {
  onNavigate: (route: AppRoute) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = PRACTICE_QUESTIONS[currentIndex];
  const total = PRACTICE_QUESTIONS.length;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const percentage = Math.round((correctCount / total) * 100);

    return (
      <div className={styles.container}>
        <div className={styles.completedCard}>
          <SpottySticker type="celebrate" size={120} />
          <h2 className={styles.completedTitle}>Тренировка завершена</h2>
          <div className={styles.completedScore}>
            {correctCount} / {total}
          </div>
          <p className={styles.completedDescription}>
            Вы решили верно {percentage}% тренировочных задач. Теперь вы готовы проверить
            свои силы в итоговом экзамене и получить сертификат.
          </p>

          <div className={styles.completedActions}>
            <button
              className={styles.btnNext}
              onClick={() => onNavigate('exam')}
              style={{ width: 'auto' }}
            >
              Перейти к экзамену
            </button>
            <button
              className={styles.btnRestart}
              onClick={handleRestart}
            >
              Пройти тренировку заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <div className={styles.container}>
      {/* Top progress and restart */}
      <div className={styles.topBar}>
        <span className={styles.progressLabel}>
          Вопрос {currentIndex + 1} из {total}
        </span>
        <button
          className={styles.btnRestart}
          onClick={handleRestart}
          title="Сбросить прогресс тренировки"
        >
          Начать заново
        </button>
      </div>

      <div
        className={styles.progressBarTrack}
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className={styles.progressBarFill}
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question Card: Responsive 2-column on desktop, single column on mobile */}
      <div key={currentIndex} className={styles.questionCard}>
        <div className={styles.cardLayout}>
          {/* Left Column: Task & Geometric Diagram */}
          <div className={styles.taskSide}>
            <div className={styles.questionHeader}>
              <h2 className={styles.questionTitle}>{currentQuestion.title}</h2>
              <p className={styles.questionPrompt}>{currentQuestion.prompt}</p>
            </div>

            <div className={styles.diagramWrapper}>
              <GeometricDiagram config={currentQuestion.diagram} />
            </div>
          </div>

          {/* Right Column: Answer Options, Feedback & Next Button */}
          <div className={styles.interactionSide}>
            <div className={styles.optionsList} role="radiogroup" aria-label="Варианты ответов">
              {currentQuestion.options.map((option, idx) => {
                let optionClass = styles.optionBtn;
                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    optionClass = `${styles.optionBtn} ${styles.optionCorrect}`;
                  } else if (idx === selectedOption) {
                    optionClass = `${styles.optionBtn} ${styles.optionIncorrect}`;
                  }
                }

                return (
                  <button
                    key={idx}
                    className={optionClass}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    role="radio"
                    aria-checked={selectedOption === idx}
                  >
                    <span className={styles.optionIndex}>{idx + 1}.</span>
                    <span className={styles.optionText}>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Feedback with Spotty */}
            {isAnswered && (
              <div className={styles.feedbackBox} aria-live="polite">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <SpottySticker
                    type={isCurrentCorrect ? 'success' : 'error'}
                    size={64}
                  />
                  <div style={{ flex: 1 }}>
                    <div className={styles.feedbackHeader}>
                      <span
                        className={
                          isCurrentCorrect
                            ? styles.feedbackStatusCorrect
                            : styles.feedbackStatusIncorrect
                        }
                      >
                        {isCurrentCorrect ? 'Верно!' : 'Пока неверно'}
                      </span>
                    </div>

                    <div>
                      <span className={styles.theoremTag}>Использованное свойство: </span>
                      <span className={styles.theoremName}>{currentQuestion.theoremUsed}</span>
                    </div>
                  </div>
                </div>

                <p className={styles.explanationText}>{currentQuestion.explanation}</p>
              </div>
            )}

            {isAnswered && (
              <div className={styles.actionsBar}>
                {!isCurrentCorrect && (
                  <button
                    type="button"
                    className={styles.btnTheory}
                    onClick={() => onNavigate('theory')}
                  >
                    Повторить теорию
                  </button>
                )}
                <button className={styles.btnNext} onClick={handleNext}>
                  {currentIndex < total - 1 ? 'Следующий вопрос →' : 'Посмотреть итог →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
