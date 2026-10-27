export type AppRoute =
  | 'home'
  | 'theory'
  | 'practice'
  | 'exam'
  | 'results'
  | 'certificate'
  | 'access';

export type AngleRelation = 'equal' | 'supplementary';

export interface AnglePair {
  id: string;
  name: string;
  category:
    | 'corresponding'
    | 'alternate_interior'
    | 'alternate_exterior'
    | 'consecutive_interior'
    | 'consecutive_exterior'
    | 'vertical'
    | 'adjacent';
  angles: [number, number];
  relation: AngleRelation;
  formula: string;
  description: string;
}

export interface TheorySection {
  id: string;
  order: number;
  title: string;
  summary: string;
  content: string[];
  rules: string[];
  highlightAngles?: number[];
  interactivePairId?: string;
}

export interface DiagramAngleConfig {
  value?: string | number;
  label?: string;
  highlight?: boolean;
  colorVariant?: 'primary' | 'secondary' | 'accent';
  arcRadius?: number;
}

export interface DiagramConfig {
  type: 'transversal' | 'parallel_test' | 'zigzag' | 'double_transversal';
  angles: Record<number, DiagramAngleConfig>;
  linesParallel?: boolean;
  lineLabels?: { a?: string; b?: string; c?: string; d?: string };
  customPoints?: {
    aY?: number;
    bY?: number;
    transversalAngle?: number;
  };
  note?: string;
}

export interface Question {
  id: string;
  title: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  theoremUsed: string;
  diagram: DiagramConfig;
}

export interface ExamUserAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  answers: ExamUserAnswer[];
  completedAt: string;
}

export interface CertificateData {
  studentName: string;
  resultPercentage: number;
  correctCount: number;
  totalCount: number;
  completionDate: string;
  certificateId: string;
}
