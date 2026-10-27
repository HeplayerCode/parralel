import React from 'react';
import styles from './HeroWord.module.css';

const LETTERS = ['П', 'А', 'Р', 'А', 'Л', 'Л', 'Е', 'Л', 'Ь'];

export const HeroWord: React.FC = () => {
  return (
    <div className={styles.heroWordWrapper} aria-label="ПАРАЛЛЕЛЬ">
      <h1 className={styles.heroWord}>
        {LETTERS.map((char, index) => (
          <span
            key={index}
            className={`${styles.letter} ${styles[`letter${index}`] || ''}`}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};
