import React from 'react';
import { DiagramConfig } from '../types';
import styles from './GeometricDiagram.module.css';

interface GeometricDiagramProps {
  config: DiagramConfig;
  onAngleClick?: (angleNumber: number) => void;
  interactive?: boolean;
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// Generates an SVG arc line (from startAngle to endAngle clockwise)
function describeArcLine(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const delta = endAngle - startAngle;
  const largeArcFlag = delta > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

// Generates a pie wedge sector from center to arc
function describeWedge(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const delta = endAngle - startAngle;
  const largeArcFlag = delta > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

export const GeometricDiagram: React.FC<GeometricDiagramProps> = ({
  config,
  onAngleClick,
  interactive = false,
}) => {
  if (config.type === 'zigzag') {
    return (
      <div className={styles.container}>
        <div className={styles.svgWrapper}>
          <svg
            className={styles.svg}
            viewBox="0 0 540 280"
            role="img"
            aria-label="Схема ломаной между параллельными прямыми"
          >
            {/* Parallel lines */}
            <line x1="40" y1="65" x2="500" y2="65" className={styles.mainLine} />
            <line x1="40" y1="215" x2="500" y2="215" className={styles.mainLine} />

            {/* Labels for lines */}
            <text x="510" y="70" className={styles.lineLabel}>
              {config.lineLabels?.a ?? 'a'}
            </text>
            <text x="510" y="220" className={styles.lineLabel}>
              {config.lineLabels?.b ?? 'b'}
            </text>

            {/* Auxiliary parallel line */}
            <line x1="40" y1="140" x2="500" y2="140" className={styles.auxiliaryLine} />
            <text x="510" y="145" className={styles.lineLabel} fill="var(--color-text-secondary)">
              k ∥ a
            </text>

            {/* Zigzag segments */}
            <polyline
              points="140,65 260,140 170,215"
              fill="none"
              stroke="var(--color-text)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Vertices */}
            <circle cx="140" cy="65" r="3.5" fill="var(--color-text)" />
            <circle cx="260" cy="140" r="3.5" fill="var(--color-text)" />
            <circle cx="170" cy="215" r="3.5" fill="var(--color-text)" />

            <text x="125" y="55" className={styles.vertexLabel}>
              A
            </text>
            <text x="275" y="145" className={styles.vertexLabel}>
              B
            </text>
            <text x="155" y="235" className={styles.vertexLabel}>
              C
            </text>

            {/* Angle at A */}
            <path
              d={describeArcLine(140, 65, 28, 0, 32)}
              fill="none"
              stroke="var(--color-text)"
              strokeWidth="2"
            />
            <rect x="180" y="68" width="44" height="22" rx="4" className={styles.valuePill} />
            <text x="202" y="80" className={styles.valuePillText}>
              35°
            </text>

            {/* Angle at C */}
            <path
              d={describeArcLine(170, 215, 28, 318, 360)}
              fill="none"
              stroke="var(--color-text)"
              strokeWidth="2"
            />
            <rect x="208" y="196" width="44" height="22" rx="4" className={styles.valuePill} />
            <text x="230" y="208" className={styles.valuePillText}>
              45°
            </text>

            {/* Angle at B */}
            <path
              d={describeWedge(260, 140, 28, 148, 212)}
              className={styles.wedgeFillActivePrimary}
            />
            <path
              d={describeArcLine(260, 140, 28, 148, 212)}
              fill="none"
              stroke="var(--color-text)"
              strokeWidth="2.2"
            />
            <rect x="202" y="129" width="32" height="22" rx="4" className={styles.valuePillActive} />
            <text x="218" y="141" className={styles.valuePillText}>
              ?
            </text>
          </svg>
        </div>
        {config.note && <div className={styles.noteText}>{config.note}</div>}
      </div>
    );
  }

  // Intersections
  const p1 = { x: 220, y: 85 };
  const p2 = { x: 320, y: 195 };

  // Angle definitions:
  // Theta of transversal = 47.73°
  // Angle 1: 180° to 227.73° (top-left acute)
  // Angle 2: 227.73° to 360° (top-right obtuse)
  // Angle 3: 47.73° to 180° (bottom-left obtuse)
  // Angle 4: 0° to 47.73° (bottom-right acute)
  const angleGeometry: Record<
    number,
    {
      center: { x: number; y: number };
      start: number;
      end: number;
      radius: number;
      labelPos: { x: number; y: number };
      defaultLabel: string;
      isAcute: boolean;
    }
  > = {
    1: {
      center: p1,
      start: 180,
      end: 227.73,
      radius: 28,
      labelPos: { x: 176, y: 64 },
      defaultLabel: '1',
      isAcute: true,
    },
    2: {
      center: p1,
      start: 227.73,
      end: 360,
      radius: 22,
      labelPos: { x: 240, y: 46 },
      defaultLabel: '2',
      isAcute: false,
    },
    3: {
      center: p1,
      start: 47.73,
      end: 180,
      radius: 22,
      labelPos: { x: 200, y: 124 },
      defaultLabel: '3',
      isAcute: false,
    },
    4: {
      center: p1,
      start: 0,
      end: 47.73,
      radius: 28,
      labelPos: { x: 264, y: 104 },
      defaultLabel: '4',
      isAcute: true,
    },

    5: {
      center: p2,
      start: 180,
      end: 227.73,
      radius: 28,
      labelPos: { x: 276, y: 174 },
      defaultLabel: '5',
      isAcute: true,
    },
    6: {
      center: p2,
      start: 227.73,
      end: 360,
      radius: 22,
      labelPos: { x: 340, y: 156 },
      defaultLabel: '6',
      isAcute: false,
    },
    7: {
      center: p2,
      start: 47.73,
      end: 180,
      radius: 22,
      labelPos: { x: 300, y: 234 },
      defaultLabel: '7',
      isAcute: false,
    },
    8: {
      center: p2,
      start: 0,
      end: 47.73,
      radius: 28,
      labelPos: { x: 364, y: 214 },
      defaultLabel: '8',
      isAcute: true,
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.svgWrapper}>
        <svg
          className={styles.svg}
          viewBox="0 0 540 280"
          role="img"
          aria-label="Геометрическая схема параллельных прямых и секущей"
        >
          {/* Soft Wedge Fills for highlighted angles */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
            const geom = angleGeometry[num];
            const cfg = config.angles[num];
            if (!cfg?.highlight) return null;

            const wedgePath = describeWedge(
              geom.center.x,
              geom.center.y,
              geom.radius + 8,
              geom.start,
              geom.end
            );

            const fillClass =
              cfg.colorVariant === 'secondary'
                ? styles.wedgeFillActiveSecondary
                : styles.wedgeFillActivePrimary;

            return (
              <path
                key={`wedge-${num}`}
                d={wedgePath}
                className={`${styles.wedgeFill} ${fillClass}`}
              />
            );
          })}

          {/* Main horizontal line a */}
          <line x1="40" y1="85" x2="500" y2="85" className={styles.mainLine} />
          {/* Main horizontal line b */}
          <line x1="40" y1="195" x2="500" y2="195" className={styles.mainLine} />

          {/* Line Labels */}
          <text x="510" y="90" className={styles.lineLabel}>
            {config.lineLabels?.a ?? 'a'}
          </text>
          <text x="510" y="200" className={styles.lineLabel}>
            {config.lineLabels?.b ?? 'b'}
          </text>

          {/* Transversal line c */}
          <line x1="145" y1="5" x2="395" y2="275" className={styles.transversalLine} />
          <text x="400" y="278" className={styles.lineLabel}>
            {config.lineLabels?.c ?? 'c'}
          </text>

          {/* Intersection Points */}
          <circle cx={p1.x} cy={p1.y} r="3" fill="var(--color-text)" />
          <circle cx={p2.x} cy={p2.y} r="3" fill="var(--color-text)" />

          {/* Arc lines and Labels for all 8 angles */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
            const geom = angleGeometry[num];
            const cfg = config.angles[num];
            const isHighlighted = cfg?.highlight ?? false;
            const variant = cfg?.colorVariant ?? 'primary';

            const arcLinePath = describeArcLine(
              geom.center.x,
              geom.center.y,
              geom.radius,
              geom.start,
              geom.end
            );

            let arcClass = styles.angleArc;
            if (isHighlighted) {
              arcClass =
                variant === 'secondary'
                  ? `${styles.angleArc} ${styles.angleArcActiveSecondary}`
                  : `${styles.angleArc} ${styles.angleArcActivePrimary}`;
            }

            const hasExplicitValue = !!cfg?.value;
            const displayText = cfg?.value ?? cfg?.label ?? geom.defaultLabel;

            return (
              <g
                key={num}
                className={interactive ? styles.angleInteractive : undefined}
                onClick={() => onAngleClick?.(num)}
                role={interactive ? 'button' : undefined}
                tabIndex={interactive ? 0 : undefined}
                onKeyDown={(e) => {
                  if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onAngleClick?.(num);
                  }
                }}
                aria-label={`Угол ${num}${cfg?.value ? `: ${cfg.value}` : ''}`}
              >
                {/* Arc line */}
                <path d={arcLinePath} className={arcClass} />

                {/* If it's a specific problem value (e.g. 65° or x or ?) render a neat pill */}
                {hasExplicitValue ? (
                  <>
                    <rect
                      x={geom.labelPos.x - Math.max(26, String(displayText).length * 9 + 10) / 2}
                      y={geom.labelPos.y - 11}
                      width={Math.max(26, String(displayText).length * 9 + 10)}
                      height={22}
                      className={isHighlighted ? styles.valuePillActive : styles.valuePill}
                    />
                    <text
                      x={geom.labelPos.x}
                      y={geom.labelPos.y + 1}
                      className={styles.valuePillText}
                    >
                      {displayText}
                    </text>
                  </>
                ) : (
                  /* Standard clean numeral (NO black box!) */
                  <text
                    x={geom.labelPos.x}
                    y={geom.labelPos.y + 1}
                    className={
                      isHighlighted
                        ? `${styles.angleNumeral} ${styles.angleNumeralActive}`
                        : styles.angleNumeral
                    }
                  >
                    {displayText}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {config.note && <div className={styles.noteText}>{config.note}</div>}
    </div>
  );
};
