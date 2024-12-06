import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;
  max?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100 }) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarFill} style={{ width: `${percentage}%` }}>
        <span className={styles.progressBarText}>{`${percentage}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;