import React, { useEffect, useRef, useState, ElementType, ComponentPropsWithoutRef } from 'react';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps<T extends ElementType = 'div'> {
  as?: T;
  delay?: number;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
}

export function ScrollReveal<T extends ElementType = 'div'>({
  as,
  delay = 0,
  threshold = 0.12,
  className = '',
  children,
  ...rest
}: ScrollRevealProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ScrollRevealProps<T>>) {
  const Component = as || 'div';
  const elementRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const styleWithDelay: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  return (
    <Component
      ref={elementRef as unknown as React.Ref<never>}
      className={`${styles.revealItem} ${isRevealed ? styles.isRevealed : ''} ${className}`.trim()}
      style={styleWithDelay}
      {...rest}
    >
      {children}
    </Component>
  );
}
