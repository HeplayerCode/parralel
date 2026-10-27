import React from 'react';
import { AppRoute, ExamResult } from '../types';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import { GeometricDiagram } from './GeometricDiagram';
import { SpottySticker } from './SpottySticker';
import { ScrollReveal } from './ScrollReveal';
import styles from './ResultsView.module.css';

interface ResultsViewProps {
  result: ExamResult | null;
  onNavigate: (route: AppRoute) => void;
  onRetakeExam: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onNavigate,
  onRetakeExam,
}) => {
  if (!result) {
    return (
      <div className={styles.container}>
        <div className={styles.summaryCard}>
          <h2 className={styles.reviewHeading}>Экзамен ещё не пройден</h2>
          <p>Пройдите экзамен, чтобы увидеть результаты и получить сертификат.</p>
          <button className={styles.btnPrimary} onClick={() => onNavigate('exam')}>
            Перейти к экзамену
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Top Summary Card */}
      <ScrollReveal>
        <div className={styles.summaryCard}>
          <SpottySticker
            type={result.passed ? 'celebrate' : 'error'}
            size={120}
          />
          <div className={styles.statusLabel}>Результаты итогового экзамена</div>
          <div className={styles.scorePercentage}>{result.percentage}%</div>
          <div className={styles.scoreDetails}>
            {result.correctAnswers} из {result.totalQuestions} верных ответов
          </div>

          {result.passed ? (
            <div className={styles.statusMessagePassed}>
              Экзамен успешно сдан! Вы подтвердили уверенное владение свойствами параллельных прямых
              и признаками параллельности.
            </div>
          ) : (
            <div className={styles.statusMessageFailed}>
              Порог успешного прохождения (70%) не достигнут. Рекомендуем повторить разделы теории,
              пройти тренировочный модуль и попробовать снова.
            </div>
          )}

          <div className={styles.actionsGroup}>
            {result.passed && (
              <button
                className={styles.btnPrimary}
                onClick={() => onNavigate('certificate')}
              >
                Оформить сертификат
              </button>
            )}
            <button className={styles.btnSecondary} onClick={onRetakeExam}>
              Пройти экзамен заново
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => onNavigate('theory')}
            >
              Повторить теорию
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Detailed Mistakes & Questions Review */}
      <section className={styles.reviewSection} aria-labelledby="review-heading">
        <ScrollReveal>
          <h2 id="review-heading" className={styles.reviewHeading}>
            Подробный разбор заданий
          </h2>
        </ScrollReveal>

        <div className={styles.reviewList}>
          {EXAM_QUESTIONS.map((question, idx) => {
            const userAnswer = result.answers[idx];
            const isCorrect = userAnswer?.isCorrect ?? false;
            const userSelectedIndex = userAnswer?.selectedIndex ?? -1;

            const userSelectedText =
              userSelectedIndex >= 0
                ? question.options[userSelectedIndex]
                : 'Ответ не был выбран';

            const correctText = question.options[question.correctIndex];

            return (
              <ScrollReveal key={question.id} threshold={0.08}>
                <article className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <h3 className={styles.reviewQuestionTitle}>
                      Вопрос {idx + 1}. {question.title}
                    </h3>
                    <span
                      className={
                        isCorrect ? styles.reviewBadgeCorrect : styles.reviewBadgeIncorrect
                      }
                    >
                      {isCorrect ? 'Верно' : 'Ошибка'}
                    </span>
                  </div>

                  <p className={styles.reviewPrompt}>{question.prompt}</p>

                  <div className={styles.reviewDiagramSide}>
                    <GeometricDiagram config={question.diagram} />
                  </div>

                  <div className={styles.answersCompare}>
                    <div
                      className={`${styles.answerBlock} ${
                        isCorrect ? styles.answerBlockCorrect : ''
                      }`}
                    >
                      <div className={styles.answerBlockTitle}>Ваш выбор:</div>
                      <div className={styles.answerBlockValue}>{userSelectedText}</div>
                    </div>

                    <div className={`${styles.answerBlock} ${styles.answerBlockCorrect}`}>
                      <div className={styles.answerBlockTitle}>Правильный ответ:</div>
                      <div className={styles.answerBlockValue}>{correctText}</div>
                    </div>
                  </div>

                  <div className={styles.explanationBox}>
                    <span className={styles.explanationTheorem}>
                      Теорема: {question.theoremUsed}
                    </span>
                    <p className={styles.explanationText}>{question.explanation}</p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
};
