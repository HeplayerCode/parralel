import React, { useState } from 'react';
import styles from './HeroGeometryCanvas.module.css';

type Mode = 'free' | 'alternate' | 'corresponding' | 'consecutive';

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArcLine(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const delta = endAngle - startAngle;
  const largeArcFlag = delta > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

function describeWedge(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const delta = endAngle - startAngle;
  const largeArcFlag = delta > 180 ? 1 : 0;
  return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

export const HeroGeometryCanvas: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('alternate');
  const [selectedAngle, setSelectedAngle] = useState<number | null>(3);
  const [hoveredAngle, setHoveredAngle] = useState<number | null>(null);

  const p1 = { x: 220, y: 85 };
  const p2 = { x: 320, y: 195 };

  const angleGeometry: Record<
    number,
    {
      center: { x: number; y: number };
      start: number;
      end: number;
      radius: number;
      labelPos: { x: number; y: number };
      isAcute: boolean;
      degrees: number;
    }
  > = {
    1: { center: p1, start: 180, end: 227.73, radius: 28, labelPos: { x: 176, y: 64 }, isAcute: true, degrees: 50 },
    2: { center: p1, start: 227.73, end: 360, radius: 22, labelPos: { x: 242, y: 46 }, isAcute: false, degrees: 130 },
    3: { center: p1, start: 47.73, end: 180, radius: 22, labelPos: { x: 198, y: 124 }, isAcute: false, degrees: 130 },
    4: { center: p1, start: 0, end: 47.73, radius: 28, labelPos: { x: 264, y: 104 }, isAcute: true, degrees: 50 },
    5: { center: p2, start: 180, end: 227.73, radius: 28, labelPos: { x: 276, y: 174 }, isAcute: true, degrees: 50 },
    6: { center: p2, start: 227.73, end: 360, radius: 22, labelPos: { x: 342, y: 156 }, isAcute: false, degrees: 130 },
    7: { center: p2, start: 47.73, end: 180, radius: 22, labelPos: { x: 298, y: 234 }, isAcute: false, degrees: 130 },
    8: { center: p2, start: 0, end: 47.73, radius: 28, labelPos: { x: 364, y: 214 }, isAcute: true, degrees: 50 },
  };

  const isAngleHighlighted = (angleNum: number): boolean => {
    if (hoveredAngle === angleNum) return true;

    if (activeMode === 'alternate') {
      return angleNum === 3 || angleNum === 5;
    }
    if (activeMode === 'corresponding') {
      return angleNum === 1 || angleNum === 5;
    }
    if (activeMode === 'consecutive') {
      return angleNum === 3 || angleNum === 6;
    }

    if (activeMode === 'free' && selectedAngle !== null) {
      if (angleNum === selectedAngle) return true;
      // Also highlight natural alternate pair for feedback
      const pairs: Record<number, number> = { 3: 5, 5: 3, 4: 6, 6: 4, 1: 7, 7: 1, 2: 8, 8: 2 };
      return pairs[selectedAngle] === angleNum;
    }

    return false;
  };

  const getReadoutInfo = () => {
    if (activeMode === 'alternate') {
      return {
        formula: '∠3 = ∠5 = 130°',
        type: 'Внутренние накрест лежащие',
        note: 'Если при пересечении двух прямых секущей накрест лежащие углы равны, то прямые параллельны (a ∥ b).',
      };
    }
    if (activeMode === 'corresponding') {
      return {
        formula: '∠1 = ∠5 = 50°',
        type: 'Соответственные углы',
        note: 'Соответственные углы лежат по одну сторону от секущей и на одинаковых позициях относительно прямых a и b.',
      };
    }
    if (activeMode === 'consecutive') {
      return {
        formula: '∠3 + ∠6 = 130° + 50° = 180°',
        type: 'Односторонние углы',
        note: 'Если сумма односторонних углов равна 180°, прямые параллельны (a ∥ b).',
      };
    }
    if (selectedAngle !== null) {
      const geo = angleGeometry[selectedAngle];
      return {
        formula: `∠${selectedAngle} = ${geo.degrees}°`,
        type: geo.isAcute ? 'Острый угол' : 'Тупой угол',
        note: `Смежный угол равен ${180 - geo.degrees}°, вертикальный равен ${geo.degrees}°. Нажмите на другие углы для сравнения.`,
      };
    }
    return {
      formula: 'a ∥ b (прямые параллельны)',
      type: 'Исследование чертежа',
      note: 'Нажмите на любой угол или выберите теорему в верхнем меню.',
    };
  };

  const readout = getReadoutInfo();

  return (
    <div className={styles.canvasContainer}>
      {/* Top telemetry toolbar */}
      <div className={styles.topToolbar}>
        <div className={styles.telemetryGroup}>
          <span className={styles.monoChip}>
            <span className={styles.statusDot} aria-hidden="true" />
            LIVE SVG
          </span>
          <span className={styles.lineTag}>a ∥ b</span>
          <span className={styles.lineTag}>c — секущая</span>
        </div>

        <div className={styles.presetsGroup} role="tablist" aria-label="Теоремы параллельности">
          <button
            type="button"
            className={`${styles.presetBtn} ${activeMode === 'alternate' ? styles.presetBtnActive : ''}`}
            onClick={() => {
              setActiveMode('alternate');
              setSelectedAngle(3);
            }}
          >
            Накрест лежащие
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${activeMode === 'corresponding' ? styles.presetBtnActive : ''}`}
            onClick={() => {
              setActiveMode('corresponding');
              setSelectedAngle(1);
            }}
          >
            Соответственные
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${activeMode === 'consecutive' ? styles.presetBtnActive : ''}`}
            onClick={() => {
              setActiveMode('consecutive');
              setSelectedAngle(3);
            }}
          >
            Односторонние (180°)
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${activeMode === 'free' ? styles.presetBtnActive : ''}`}
            onClick={() => {
              setActiveMode('free');
            }}
          >
            Свободный выбор
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className={styles.svgWrapper}>
        <svg
          className={styles.svg}
          viewBox="0 0 540 280"
          role="img"
          aria-label="Интерактивный чертеж параллельных прямых a и b с секущей c"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2A2C38" />
              <stop offset="50%" stopColor="#4A4E65" />
              <stop offset="100%" stopColor="#2A2C38" />
            </linearGradient>
          </defs>

          {/* Background grid dots for technical drawing feel */}
          <g className={styles.gridDots} opacity="0.15">
            {[40, 100, 160, 220, 280, 340, 400, 460, 500].map((x) =>
              [40, 85, 140, 195, 250].map((y) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#FFFFFF" />
              ))
            )}
          </g>

          {/* Parallel lines */}
          <line x1="30" y1="85" x2="510" y2="85" className={styles.parallelLine} />
          <line x1="30" y1="195" x2="510" y2="195" className={styles.parallelLine} />

          {/* Transversal line */}
          <line x1="140" y1="0" x2="400" y2="280" className={styles.transversalLine} />

          {/* Line Labels */}
          <text x="495" y="75" className={styles.lineLabel}>
            a
          </text>
          <text x="495" y="185" className={styles.lineLabel}>
            b
          </text>
          <text x="408" y="270" className={styles.transversalLabel}>
            c
          </text>

          {/* Angles 1 to 8 */}
          {([1, 2, 3, 4, 5, 6, 7, 8] as const).map((angleNum) => {
            const geo = angleGeometry[angleNum];
            const highlighted = isAngleHighlighted(angleNum);

            return (
              <g
                key={angleNum}
                className={`${styles.angleGroup} ${highlighted ? styles.angleGroupHighlighted : ''}`}
                onClick={() => {
                  setSelectedAngle(angleNum);
                  if (activeMode !== 'free') setActiveMode('free');
                }}
                onMouseEnter={() => setHoveredAngle(angleNum)}
                onMouseLeave={() => setHoveredAngle(null)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label={`Угол ${angleNum}, ${geo.degrees} градусов`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedAngle(angleNum);
                    if (activeMode !== 'free') setActiveMode('free');
                  }
                }}
              >
                {/* Wedge fill on highlight */}
                {highlighted && (
                  <path
                    d={describeWedge(geo.center.x, geo.center.y, geo.radius + 6, geo.start, geo.end)}
                    className={styles.wedgeFill}
                  />
                )}

                {/* Arc stroke */}
                <path
                  d={describeArcLine(geo.center.x, geo.center.y, geo.radius, geo.start, geo.end)}
                  className={`${styles.arcStroke} ${highlighted ? styles.arcStrokeHighlighted : ''}`}
                />

                {/* Interactive pill container */}
                <circle
                  cx={geo.labelPos.x}
                  cy={geo.labelPos.y}
                  r="13"
                  className={`${styles.angleCircle} ${highlighted ? styles.angleCircleHighlighted : ''}`}
                />
                <text
                  x={geo.labelPos.x}
                  y={geo.labelPos.y + 4}
                  className={`${styles.angleLabelText} ${highlighted ? styles.angleLabelTextHighlighted : ''}`}
                  textAnchor="middle"
                >
                  {angleNum}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Live Formula Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.readoutFormula}>
          <span className={styles.formulaTag}>{readout.type}</span>
          <span className={styles.formulaValue}>{readout.formula}</span>
        </div>
        <p className={styles.readoutNote}>{readout.note}</p>
      </div>
    </div>
  );
};
