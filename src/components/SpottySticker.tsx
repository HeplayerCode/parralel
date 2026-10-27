import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light';
import { SpottyModal } from './SpottyModal';
import styles from './SpottySticker.module.css';

export type SpottyType =
  | 'hero'
  | 'theory'
  | 'success'
  | 'error'
  | 'celebrate'
  | 'access'
  | 'restricted'
  | 'idea'
  | 'laptop'
  | 'stars'
  | 'like'
  | 'wave'
  | 'intro';

interface SpottyStickerProps {
  type: SpottyType;
  size?: number;
  className?: string;
  loop?: boolean;
  interactive?: boolean;
}

export const SpottySticker: React.FC<SpottyStickerProps> = ({
  type,
  size = 120,
  className = '',
  loop = true,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use base URL for reliable path resolving across environments & GitHub Pages
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    const stickerPath = `${baseUrl}/stickers/spotty-${type}.json`;

    animRef.current?.destroy();

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay: true,
      path: stickerPath,
    });

    return () => {
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [type, loop]);

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={`${styles.wrapper} ${interactive ? styles.interactive : ''} ${className}`.trim()}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? 'Спотти — талисман платформы. Нажмите, чтобы познакомиться' : undefined}
        title={interactive ? 'Спотти — талисман платформы «ПАРАЛЛЕЛЬ». Нажмите, чтобы познакомиться!' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{ width: size, height: size }}
      >
        <div
          ref={containerRef}
          className={styles.sticker}
          style={{ width: size, height: size }}
        />
      </div>

      {interactive && (
        <SpottyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
