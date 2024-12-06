import React from 'react';
import styles from './ComparisonCard.module.css';

interface ComparisonCardProps {
  title: string;
  text: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ title, text }) => {
  return (
    <div className={styles.card}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardText}>{text}</p>
    </div>
  );
};

export default ComparisonCard;