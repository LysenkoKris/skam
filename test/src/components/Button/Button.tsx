import React from 'react';
import styles from './Button.module.css';

// Определение типа для пропсов компонента
interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'delete' | 'link'; // Дополнительный проп для варианта кнопки
  size?: 'small' | 'medium' | 'large'; // Дополнительный проп для размера кнопки
  disabled?: boolean; // Дополнительный проп для состояния disabled
  onClick?: () => void;
}

export default function Button({ text, variant = 'primary', size = 'medium', disabled = false, onClick,}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}