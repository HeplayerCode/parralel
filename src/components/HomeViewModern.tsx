import React from 'react';
import { AppRoute } from '../types';
import { InlineTickerBadge } from './InlineTickerBadge';
import { HeroGeometryCanvas } from './HeroGeometryCanvas';
import { TaskCarousel } from './TaskCarousel';
import { SpottySticker } from './SpottySticker';
import { ScrollReveal } from './ScrollReveal';
import styles from './HomeViewModern.module.css';

interface HomeViewModernProps {
  onNavigate: (route: AppRoute) => void;
  onOpenGetAccess: () => void;
}

export const HomeViewModern: React.FC<HomeViewModernProps> = ({ onNavigate }) => {
  const scrollToExplore = () => {
    const el = document.getElementById('modern-tasks');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.modernContainer}>
      {/* Mobbin & Polyviral Hero Section */}
      <section className={styles.heroSection} aria-labelledby="modern-hero-title">
        <div className={styles.heroInner}>
          {/* Top Polyviral Chip */}
          <div className={styles.topBadgeRow}>
            <div className={styles.telemetryChip}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>ГЕОМЕТРИЯ 7 КЛАСС • ОБРАЗОВАТЕЛЬНЫЙ ТРЕНАЖЁР</span>
            </div>
            <div className={styles.specChip}>ИТ-КОЛЛЕДЖ 2026</div>
          </div>

          {/* Mobbin Headline with Inline Interactive Flipping Badge */}
          <h1 id="modern-hero-title" className={styles.heroHeadline}>
            Изучайте параллельные прямые и{' '}
            <InlineTickerBadge />
            {' '}на динамических чертежах
          </h1>

          {/* Subtitle */}
          <p className={styles.heroDescription}>
            Интерактивный учебный тренажёр для освоения свойств параллельности прямых.
            Разберитесь во всех парах углов, потренируйтесь на практических чертежах и сдайте итоговый экзамен.
          </p>

          {/* CTAs */}
          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => onNavigate('theory')}
            >
              <span>Начать обучение</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={scrollToExplore}
            >
              <span>Смотреть задачи</span>
            </button>
          </div>

          {/* Polyviral Spec Tags */}
          <div className={styles.specTagsRow}>
            <div className={styles.specTag}>
              <span className={styles.specTagNumber}>8</span>
              <span className={styles.specTagLabel}>интерактивных задач</span>
            </div>
            <div className={styles.specDivider} aria-hidden="true" />
            <div className={styles.specTag}>
              <span className={styles.specTagNumber}>10</span>
              <span className={styles.specTagLabel}>вопросов экзамена</span>
            </div>
            <div className={styles.specDivider} aria-hidden="true" />
            <div className={styles.specTag}>
              <span className={styles.specTagNumber}>180°</span>
              <span className={styles.specTagLabel}>односторонние углы</span>
            </div>
            <div className={styles.specDivider} aria-hidden="true" />
            <div className={styles.specTag}>
              <span className={styles.specTagNumber}>А4</span>
              <span className={styles.specTagLabel}>именной сертификат</span>
            </div>
          </div>

          {/* Live Hero Canvas Visual */}
          <div className={styles.canvasWrapper}>
            <HeroGeometryCanvas />
          </div>
        </div>
      </section>

      {/* Task Carousel Section */}
      <section id="modern-tasks" className={styles.tasksSection} aria-labelledby="tasks-title">
        <ScrollReveal>
          <div className={styles.sectionHeadingBlock}>
            <div className={styles.sectionPreTitle}>ПРАКТИКА И ТРЕНИРОВКА</div>
            <h2 id="tasks-title" className={styles.sectionTitle}>
              Живые задачи с геометрическими схемами
            </h2>
            <p className={styles.sectionSubtitle}>
              Исследуйте чертежи, проверяйте соотношения углов и сразу получайте моментальный разбор теорем.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.carouselContainer}>
            <TaskCarousel />
          </div>
        </ScrollReveal>
      </section>

      {/* 3 Learning Stages (Polyviral & Mobbin cards) */}
      <section className={styles.stagesSection} aria-labelledby="stages-title">
        <ScrollReveal>
          <div className={styles.sectionHeadingBlock}>
            <div className={styles.sectionPreTitle}>МАРШРУТ ОБУЧЕНИЯ</div>
            <h2 id="stages-title" className={styles.sectionTitle}>
              Три шага к пониманию геометрии
            </h2>
            <p className={styles.sectionSubtitle}>
              Последовательный путь от базовых определений до уверенной сдачи проверочной работы.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.stagesGrid}>
          {/* Stage 1 */}
          <ScrollReveal delay={0}>
            <div className={styles.stageCard}>
              <div className={styles.stageHeader}>
                <span className={styles.stageNumber}>01</span>
                <SpottySticker type="theory" size={64} />
              </div>
              <h3 className={styles.stageTitle}>Изучите теорию</h3>
              <p className={styles.stageDesc}>
                Шесть структурированных разделов: секущая, три пары углов, три признака параллельности
                и интерактивная шпаргалка с подсветкой углов на чертеже в один клик.
              </p>
              <button
                type="button"
                className={styles.stageBtn}
                onClick={() => onNavigate('theory')}
              >
                <span>Перейти к теории</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Stage 2 */}
          <ScrollReveal delay={120}>
            <div className={styles.stageCard}>
              <div className={styles.stageHeader}>
                <span className={styles.stageNumber}>02</span>
                <SpottySticker type="laptop" size={64} />
              </div>
              <h3 className={styles.stageTitle}>Отработайте задачи</h3>
              <p className={styles.stageDesc}>
                Восемь практических упражнений с динамическими чертежами. Каждый шаг сопровождается
                подробным обоснованием с указанием применённой геометрической теоремы.
              </p>
              <button
                type="button"
                className={styles.stageBtn}
                onClick={() => onNavigate('practice')}
              >
                <span>Начать тренировку</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Stage 3 */}
          <ScrollReveal delay={240}>
            <div className={styles.stageCard}>
              <div className={styles.stageHeader}>
                <span className={styles.stageNumber}>03</span>
                <SpottySticker type="stars" size={64} />
              </div>
              <h3 className={styles.stageTitle}>Сдайте экзамен</h3>
              <p className={styles.stageDesc}>
                Контрольное тестирование из десяти вопросов. По результатам формируется детальный
                разбор ответов и генерируется именной сертификат отличника в формате А4.
              </p>
              <button
                type="button"
                className={styles.stageBtn}
                onClick={() => onNavigate('exam')}
              >
                <span>Пройти экзамен</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Geometric Angle Matrix (Polyviral Reference Section) */}
      <section className={styles.matrixSection} aria-labelledby="matrix-title">
        <ScrollReveal>
          <div className={styles.sectionHeadingBlock}>
            <div className={styles.sectionPreTitle}>ТЕОРЕТИЧЕСКИЙ БАЗИС</div>
            <h2 id="matrix-title" className={styles.sectionTitle}>
              Основные пары углов при параллельных прямых
            </h2>
            <p className={styles.sectionSubtitle}>
              Три ключевых признака, на которых строятся доказательства и геометрические решения в 7 классе.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.matrixGrid}>
          <div className={styles.matrixCard}>
            <div className={styles.matrixTag}>ТЕОРЕМА 1</div>
            <h3 className={styles.matrixCardTitle}>Накрест лежащие углы</h3>
            <div className={styles.matrixFormula}>∠3 = ∠5 &amp; ∠4 = ∠6</div>
            <p className={styles.matrixDesc}>
              Лежат во внутренней области по разные стороны от секущей прямой. При параллельности прямых
              они равны между собой.
            </p>
          </div>

          <div className={styles.matrixCard}>
            <div className={styles.matrixTag}>ТЕОРЕМА 2</div>
            <h3 className={styles.matrixCardTitle}>Соответственные углы</h3>
            <div className={styles.matrixFormula}>∠1 = ∠5, ∠2 = ∠6, ...</div>
            <p className={styles.matrixDesc}>
              Расположены по одну сторону от секущей и занимают одинаковые относительные позиции на прямых a и b.
              При параллельности прямых они равны.
            </p>
          </div>

          <div className={styles.matrixCard}>
            <div className={styles.matrixTag}>ТЕОРЕМА 3</div>
            <h3 className={styles.matrixCardTitle}>Односторонние углы</h3>
            <div className={styles.matrixFormula}>∠3 + ∠6 = 180°</div>
            <p className={styles.matrixDesc}>
              Находятся с одной стороны от секущей внутри параллельных линий. Их градусная сумма
              всегда строго равна 180 градусам.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className={styles.finalCtaSection}>
        <ScrollReveal>
          <div className={styles.finalCtaBox}>
            <SpottySticker type="hero" size={100} />
            <h2 className={styles.finalCtaTitle}>
              Готовы освоить параллельные прямые?
            </h2>
            <p className={styles.finalCtaSubtitle}>
              Начните с интерактивной теории, исследуйте чертежи и проверьте свои силы на контрольном экзамене.
            </p>
            <div className={styles.finalCtaActions}>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => onNavigate('theory')}
              >
                <span>Начать обучение</span>
                <span className={styles.btnArrow}>→</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
