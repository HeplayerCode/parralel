import React, { useState } from 'react';
import { AppRoute, DiagramConfig } from '../types';
import { THEORY_SECTIONS, ANGLE_PAIRS } from '../data/theoryData';
import { GeometricDiagram } from './GeometricDiagram';
import { SpottySticker } from './SpottySticker';
import { ScrollReveal } from './ScrollReveal';
import styles from './TheoryView.module.css';

interface TheoryViewProps {
  onNavigate: (route: AppRoute) => void;
}

export const TheoryView: React.FC<TheoryViewProps> = ({ onNavigate }) => {
  const [activePairId, setActivePairId] = useState<string>('corr-1-5');

  const selectedPair = ANGLE_PAIRS.find((p) => p.id === activePairId) ?? ANGLE_PAIRS[0];

  // Dynamic diagram config for cheat sheet
  const cheatSheetDiagramConfig: DiagramConfig = {
    type: 'transversal',
    linesParallel: true,
    lineLabels: { a: 'a', b: 'b', c: 'c' },
    angles: {
      [selectedPair.angles[0]]: {
        label: `∠${selectedPair.angles[0]}`,
        highlight: true,
        colorVariant: 'primary',
      },
      [selectedPair.angles[1]]: {
        label: `∠${selectedPair.angles[1]}`,
        highlight: true,
        colorVariant: 'secondary',
      },
    },
    note: `Выбрана пара: ${selectedPair.name} (${selectedPair.formula})`,
  };

  const getSectionDiagramConfig = (sectionId: string, highlightAngles?: number[]): DiagramConfig => {
    const anglesRecord: DiagramConfig['angles'] = {};
    if (highlightAngles && highlightAngles.length > 0) {
      highlightAngles.forEach((ang, idx) => {
        anglesRecord[ang] = {
          label: `∠${ang}`,
          highlight: true,
          colorVariant: idx % 2 === 0 ? 'primary' : 'secondary',
        };
      });
    }

    if (sectionId === 'problem-solving') {
      return {
        type: 'zigzag',
        linesParallel: true,
        lineLabels: { a: 'a', b: 'b' },
        angles: {},
        note: 'Пример задачи: ломаная между параллельными прямыми',
      };
    }

    return {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: anglesRecord,
    };
  };

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 className={styles.title}>Теоретический курс</h1>
            <p className={styles.subtitle}>
              Свойства параллельных прямых, теоремы об углах при секущей и признаки параллельности.
            </p>
          </div>
          <SpottySticker type="theory" size={96} />
        </div>
      </header>

      {/* Interactive Angle Pairs Cheat Sheet */}
      <ScrollReveal>
        <section className={styles.cheatSheetCard} aria-labelledby="cheat-sheet-heading">
          <div className={styles.cheatSheetHeader}>
            <h2 id="cheat-sheet-heading" className={styles.cheatSheetTitle}>
              Интерактивная шпаргалка по углам
            </h2>
            <span className={styles.cheatSheetSubtitle}>
              Нажмите на любую пару углов для подсветки на чертеже
            </span>
          </div>

          <div className={styles.cheatSheetLayout}>
            <div className={styles.cheatSheetDiagram}>
              <GeometricDiagram config={cheatSheetDiagramConfig} />
            </div>

            <div className={styles.cheatSheetControls}>
              {/* Corresponding */}
              <div className={styles.categoryGroup}>
                <span className={styles.categoryLabel}>Соответственные углы (равны)</span>
                <div className={styles.pairButtonsList}>
                  {ANGLE_PAIRS.filter((p) => p.category === 'corresponding').map((pair) => (
                    <button
                      key={pair.id}
                      className={`${styles.pairBtn} ${activePairId === pair.id ? styles.pairBtnActive : ''}`}
                      onClick={() => setActivePairId(pair.id)}
                    >
                      {pair.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alternate Interior */}
              <div className={styles.categoryGroup}>
                <span className={styles.categoryLabel}>Внутренние накрест лежащие (равны)</span>
                <div className={styles.pairButtonsList}>
                  {ANGLE_PAIRS.filter((p) => p.category === 'alternate_interior').map((pair) => (
                    <button
                      key={pair.id}
                      className={`${styles.pairBtn} ${activePairId === pair.id ? styles.pairBtnActive : ''}`}
                      onClick={() => setActivePairId(pair.id)}
                    >
                      {pair.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consecutive Interior */}
              <div className={styles.categoryGroup}>
                <span className={styles.categoryLabel}>Внутренние односторонние (сумма = 180°)</span>
                <div className={styles.pairButtonsList}>
                  {ANGLE_PAIRS.filter((p) => p.category === 'consecutive_interior').map((pair) => (
                    <button
                      key={pair.id}
                      className={`${styles.pairBtn} ${activePairId === pair.id ? styles.pairBtnActive : ''}`}
                      onClick={() => setActivePairId(pair.id)}
                    >
                      {pair.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Pair Info Box */}
              <div className={styles.activePairInfo}>
                <div className={styles.activePairFormula}>{selectedPair.formula}</div>
                <p className={styles.activePairDesc}>{selectedPair.description}</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 6 Thematic Sections */}
      <div className={styles.sectionsList}>
        {THEORY_SECTIONS.map((sec) => (
          <ScrollReveal key={sec.id} threshold={0.08}>
            <article className={styles.sectionCard} id={sec.id}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>{sec.title}</h2>
                <p className={styles.sectionSummary}>{sec.summary}</p>

                <div className={styles.paragraphs}>
                  {sec.content.map((p, idx) => (
                    <p key={idx} className={styles.paragraph}>
                      {p}
                    </p>
                  ))}
                </div>

                <div className={styles.rulesBox}>
                  <div className={styles.rulesTitle}>Ключевые формулы и правила</div>
                  <ul className={styles.rulesList}>
                    {sec.rules.map((rule, idx) => (
                      <li key={idx} className={styles.ruleItem}>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.sectionVisual}>
                <GeometricDiagram
                  config={getSectionDiagramConfig(sec.id, sec.highlightAngles)}
                />
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* Footer CTA */}
      <ScrollReveal delay={100}>
        <div className={styles.theoryFooter}>
          <h3 className={styles.theoryFooterTitle}>Теория освоена? Закрепите знания на практике</h3>
          <p>Пройдите серию из 8 тренировочных задач с моментальными подсказками и разбором.</p>
          <button
            className={styles.btnPrimary}
            onClick={() => onNavigate('practice')}
          >
            Перейти к тренировке
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
};
