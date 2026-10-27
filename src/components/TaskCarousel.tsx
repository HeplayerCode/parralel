import React from 'react';
import { DiagramConfig } from '../types';
import { GeometricDiagram } from './GeometricDiagram';
import styles from './TaskCarousel.module.css';

interface CarouselTask {
  id: string;
  category: string;
  prompt: string;
  diagram: DiagramConfig;
}

const CAROUSEL_TASKS: CarouselTask[] = [
  {
    id: 'car-1',
    category: 'Соответственные углы',
    prompt: 'Дано: a ∥ b, c — секущая, ∠1 = 65°. Чему равен угол ∠5?',
    diagram: {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        1: { value: '65°', label: '∠1', highlight: true, colorVariant: 'primary' },
        5: { value: '?', label: '∠5', highlight: true, colorVariant: 'secondary' },
      },
    },
  },
  {
    id: 'car-2',
    category: 'Накрест лежащие углы',
    prompt: 'Дано: a ∥ b. Известно, что ∠3 = 112°. Найдите внутренний накрест лежащий угол ∠6.',
    diagram: {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        3: { value: '112°', label: '∠3', highlight: true, colorVariant: 'primary' },
        6: { value: '?', label: '∠6', highlight: true, colorVariant: 'secondary' },
      },
    },
  },
  {
    id: 'car-3',
    category: 'Односторонние углы',
    prompt: 'Дано: a ∥ b, ∠4 = 70°. Определите величину внутреннего одностороннего угла ∠6.',
    diagram: {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        4: { value: '70°', label: '∠4', highlight: true, colorVariant: 'primary' },
        6: { value: '?', label: '∠6', highlight: true, colorVariant: 'secondary' },
      },
    },
  },
  {
    id: 'car-4',
    category: 'Ломаная между прямыми',
    prompt: 'Прямые a и b параллельны. Найдите угол излома ∠ABC, если ∠A = 35°, а ∠C = 45°.',
    diagram: {
      type: 'zigzag',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b' },
      angles: {},
      note: 'Угол A = 35°, Угол C = 45°',
    },
  },
  {
    id: 'car-5',
    category: 'Признаки параллельности',
    prompt: 'Секущая образует накрест лежащие углы ∠4 = 124° и ∠5 = 124°. Параллельны ли прямые a и b?',
    diagram: {
      type: 'parallel_test',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        4: { value: '124°', label: '∠4', highlight: true, colorVariant: 'primary' },
        5: { value: '124°', label: '∠5', highlight: true, colorVariant: 'secondary' },
      },
    },
  },
  {
    id: 'car-6',
    category: 'Внешние углы',
    prompt: 'Дано: a ∥ b, c — секущая. Градусная мера ∠2 равна 52°. Чему равен внешний угол ∠7?',
    diagram: {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        2: { value: '52°', label: '∠2', highlight: true, colorVariant: 'primary' },
        7: { value: '?', label: '∠7', highlight: true, colorVariant: 'secondary' },
      },
    },
  },
];

export const TaskCarousel: React.FC = () => {
  // Duplicating the items so the animation loop is completely seamless
  const displayTasks = [...CAROUSEL_TASKS, ...CAROUSEL_TASKS];

  return (
    <div className={styles.carouselContainer} role="region" aria-label="Примеры задач тренажёра">
      <div className={styles.fadeEdges}>
        <div className={styles.track} aria-hidden="true">
          {displayTasks.map((task, idx) => (
            <div key={`${task.id}-${idx}`} className={styles.taskCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardCategory}>{task.category}</span>
                <span className={styles.cardBadge}>Задача</span>
              </div>

              <div className={styles.diagramBox}>
                <GeometricDiagram config={task.diagram} />
              </div>

              <p className={styles.promptText}>{task.prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
