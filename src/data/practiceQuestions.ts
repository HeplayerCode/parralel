import { Question } from '../types';

export const PRACTICE_QUESTIONS: Question[] = [
  {
    id: 'pr-1',
    title: 'Нахождение соответственного угла',
    prompt:
      'Прямые a и b параллельны, c — секущая. Известно, что ∠1 = 65°. Найдите соответственный угол ∠5.',
    options: ['65°', '115°', '125°', '180°'],
    correctIndex: 0,
    explanation:
      'Углы 1 и 5 лежат в одинаковом относительном положении в узлах пересечения (соответственные углы). По теореме о свойстве параллельных прямых, соответственные углы равны: ∠5 = ∠1 = 65°.',
    theoremUsed: 'Теорема о свойстве соответственных углов при параллельных прямых',
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
    id: 'pr-2',
    title: 'Внутренние накрест лежащие углы',
    prompt:
      'Дано: a ∥ b, c — секущая. Градусная мера угла ∠3 равна 112°. Определите величину угла ∠6.',
    options: ['68°', '112°', '180°', '78°'],
    correctIndex: 1,
    explanation:
      'Углы 3 и 6 расположены во внутренней области между прямыми a и b по разные стороны от секущей c (внутренние накрест лежащие углы). При параллельных прямых они равны: ∠6 = ∠3 = 112°.',
    theoremUsed: 'Теорема о равенстве внутренних накрест лежащих углов',
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
    id: 'pr-3',
    title: 'Внутренние односторонние углы',
    prompt:
      'Прямые a и b параллельны. Угол ∠4 равен 70°. Найдите угол ∠6, если они являются внутренними односторонними.',
    options: ['70°', '100°', '110°', '120°'],
    correctIndex: 2,
    explanation:
      'Углы 4 и 6 лежат во внутренней области справа от секущей (внутренние односторонние). По свойству параллельных прямых, их сумма равна 180°: ∠4 + ∠6 = 180° ⇒ ∠6 = 180° − 70° = 110°.',
    theoremUsed: 'Свойство внутренних односторонних углов (сумма равна 180°)',
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
    id: 'pr-4',
    title: 'Комбинация соответственных и смежных углов',
    prompt:
      'Прямые a и b параллельны, c — секущая. Известно, что ∠1 = 130°. Найдите величину угла ∠6.',
    options: ['50°', '130°', '65°', '140°'],
    correctIndex: 0,
    explanation:
      'Угол ∠5 равен углу ∠1 как соответственный (∠5 = 130°). Углы ∠5 и ∠6 — смежные, поэтому ∠5 + ∠6 = 180°. Отсюда ∠6 = 180° − 130° = 50°.',
    theoremUsed: 'Свойство соответственных углов и теорема о сумме смежных углов',
    diagram: {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        1: { value: '130°', label: '∠1', highlight: true, colorVariant: 'primary' },
        6: { value: '?', label: '∠6', highlight: true, colorVariant: 'secondary' },
      },
    },
  },
  {
    id: 'pr-5',
    title: 'Сумма накрест лежащих углов',
    prompt:
      'Сумма двух внутренних накрест лежащих углов при параллельных прямых a и b равна 148°. Чему равен каждый из этих углов?',
    options: ['74°', '106°', '37°', '148°'],
    correctIndex: 0,
    explanation:
      'При параллельных прямых внутренние накрест лежащие углы равны между собой. Обозначим каждый угол за x: x + x = 148° ⇒ 2x = 148° ⇒ x = 74°.',
    theoremUsed: 'Равенство накрест лежащих углов при параллельных прямых',
    diagram: {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        3: { value: 'x', label: '∠3', highlight: true, colorVariant: 'primary' },
        6: { value: 'x', label: '∠6', highlight: true, colorVariant: 'secondary' },
      },
      note: '∠3 + ∠6 = 148°',
    },
  },
  {
    id: 'pr-6',
    title: 'Признак параллельности прямых',
    prompt:
      'При пересечении прямых a и b секущей c угол ∠4 равен 124°, а угол ∠5 равен 124°. Являются ли прямые a и b параллельными?',
    options: [
      'Да, так как внутренние накрест лежащие углы равны',
      'Нет, прямые обязательно пересекутся',
      'Невозможно определить без знания других углов',
      'Да, но только если углы прямые',
    ],
    correctIndex: 0,
    explanation:
      'Углы 4 и 5 являются внутренними накрест лежащими. По признаку 1 параллельности: если при пересечении двух прямых секущей накрест лежащие углы равны (124° = 124°), то прямые параллельны.',
    theoremUsed: 'Первый признак параллельности прямых (по накрест лежащим углам)',
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
    id: 'pr-7',
    title: 'Уравнение с односторонними углами',
    prompt:
      'Прямые a и b параллельны. Внутренний односторонний угол ∠3 на 40° больше внутреннего одностороннего угла ∠5. Найдите величину меньшего угла (∠5).',
    options: ['70°', '110°', '60°', '80°'],
    correctIndex: 0,
    explanation:
      'Пусть ∠5 = x, тогда ∠3 = x + 40°. Так как прямые параллельны, сумма односторонних углов равна 180°: x + (x + 40°) = 180° ⇒ 2x = 140° ⇒ x = 70°. Меньший угол ∠5 = 70°.',
    theoremUsed: 'Свойство суммы внутренних односторонних углов',
    diagram: {
      type: 'transversal',
      linesParallel: true,
      lineLabels: { a: 'a', b: 'b', c: 'c' },
      angles: {
        3: { value: 'x+40°', label: '∠3', highlight: true, colorVariant: 'primary' },
        5: { value: 'x', label: '∠5', highlight: true, colorVariant: 'secondary' },
      },
    },
  },
  {
    id: 'pr-8',
    title: 'Внешние накрест лежащие углы',
    prompt:
      'Прямые a и b параллельны. Угол ∠2 равен 52°. Чему равен внешний накрест лежащий угол ∠7?',
    options: ['52°', '128°', '38°', '148°'],
    correctIndex: 0,
    explanation:
      'Углы 2 и 7 лежат во внешних областях по разные стороны от секущей c (внешние накрест лежащие). При параллельных прямых они равны: ∠7 = ∠2 = 52°. (Также: ∠6 = ∠2 = 52° как соответственные, а ∠7 = ∠6 = 52° как вертикальные).',
    theoremUsed: 'Свойство внешних накрест лежащих углов при параллельных прямых',
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
