import React from 'react';
import { AppRoute } from '../types';
import { HeroWord } from './HeroWord';
import { SpottySticker } from './SpottySticker';
import { TaskCarousel } from './TaskCarousel';
import { ScrollReveal } from './ScrollReveal';
import styles from './HomeView.module.css';

interface HomeViewProps {
  onNavigate: (route: AppRoute) => void;
  onOpenGetAccess: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const scrollToExplanation = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection} aria-labelledby="hero-title">
        <HeroWord />

        <div className={styles.heroContent}>
          <SpottySticker type="hero" size={120} />
          <p className={styles.subtitle}>Интерактивный тренажёр по геометрии</p>
          <p className={styles.description}>
            Разберись в свойствах параллельных прямых и научись решать задачи с углами.
            Понятная теория, живые чертежи и практическая подготовка к контрольным.
          </p>

          <div className={styles.ctaGroup}>
            <button
              className={styles.btnPrimary}
              onClick={() => onNavigate('theory')}
            >
              Начать обучение
            </button>
            <button
              className={styles.btnSecondary}
              onClick={scrollToExplanation}
            >
              Как это работает
            </button>
          </div>
        </div>
      </section>

      {/* Fluid Circular Task Carousel */}
      <section className={styles.carouselSection} aria-labelledby="carousel-heading">
        <ScrollReveal>
          <div className={styles.sectionHeader}>
            <h2 id="carousel-heading" className={styles.sectionTitle}>
              Живые задачи с геометрическими схемами
            </h2>
            <p className={styles.sectionSubtitle}>
              Исследуйте чертежи, выбирайте ответы и сразу проверяйте геометрические теоремы на практике.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <TaskCarousel />
        </ScrollReveal>
      </section>

      {/* 3 Learning Stages */}
      <section
        id="how-it-works"
        className={styles.stagesSection}
        aria-labelledby="stages-heading"
      >
        <ScrollReveal>
          <div className={styles.sectionHeaderRow}>
            <div className={styles.sectionHeader}>
              <h2 id="stages-heading" className={styles.sectionTitle}>
                Как устроен тренажёр
              </h2>
              <p className={styles.sectionSubtitle}>
                Простой и последовательный маршрут от определений до уверенного решения школьных задач.
              </p>
            </div>
            <SpottySticker type="idea" size={96} className={styles.sectionSticker} />
          </div>
        </ScrollReveal>

        <div className={styles.stagesGrid}>
          {/* Stage 1 */}
          <ScrollReveal delay={0}>
            <div className={styles.stageCard}>
              <div className={styles.stageTopRow}>
                <div className={styles.stageNumber}>01</div>
                <SpottySticker type="theory" size={68} />
              </div>
              <h3 className={styles.stageTitle}>Изучите теорию</h3>
              <p className={styles.stageDescription}>
                Шесть коротких разделов без лишней «воды»: секущая, все пары углов, три признака
                параллельности и наглядная интерактивная шпаргалка, где можно нажать на любой угол
                и увидеть его пару на чертеже.
              </p>
              <button
                className={styles.stageAction}
                onClick={() => onNavigate('theory')}
              >
                Перейти к теории →
              </button>
            </div>
          </ScrollReveal>

          {/* Stage 2 */}
          <ScrollReveal delay={150}>
            <div className={styles.stageCard}>
              <div className={styles.stageTopRow}>
                <div className={styles.stageNumber}>02</div>
                <SpottySticker type="laptop" size={68} />
              </div>
              <h3 className={styles.stageTitle}>Потренируйтесь на задачах</h3>
              <p className={styles.stageDescription}>
                Восемь практических упражнений с моментальным объяснением каждого шага.
                Ошиблись — сразу увидите, какая именно теорема сработала и почему выбранный ответ не подошёл.
              </p>
              <button
                className={styles.stageAction}
                onClick={() => onNavigate('practice')}
              >
                Начать тренировку →
              </button>
            </div>
          </ScrollReveal>

          {/* Stage 3 */}
          <ScrollReveal delay={300}>
            <div className={styles.stageCard}>
              <div className={styles.stageTopRow}>
                <div className={styles.stageNumber}>03</div>
                <SpottySticker type="stars" size={68} />
              </div>
              <h3 className={styles.stageTitle}>Проверьте знания на экзамене</h3>
              <p className={styles.stageDescription}>
                Десять контрольных вопросов в формате проверочной работы. После завершения доступен
                детальный разбор всех заданий со схемами и оформление именного сертификата при результате от 70%.
              </p>
              <button
                className={styles.stageAction}
                onClick={() => onNavigate('exam')}
              >
                Сдать экзамен →
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final Call to Action */}
      <ScrollReveal delay={100}>
        <section className={styles.finalCtaSection}>
          <h2 className={styles.finalCtaTitle}>Готовы разобраться с углами и параллельными прямыми?</h2>
          <p className={styles.finalCtaSubtitle}>
            Начните с короткой теории, закрепите навык на практических чертежах и проверьте себя на экзамене.
          </p>
          <button
            className={styles.btnPrimary}
            onClick={() => onNavigate('theory')}
          >
            Начать обучение
          </button>
        </section>
      </ScrollReveal>
    </div>
  );
};
