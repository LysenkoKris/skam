import React from 'react';
import styles from './Button.module.css';

// Определение типа для пропсов компонента
interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'delete'; // Дополнительный проп для варианта кнопки
  size?: 'small' | 'medium' | 'large'; // Дополнительный проп для размера кнопки
  disabled?: boolean; // Дополнительный проп для состояния disabled
}

const Button: React.FC<ButtonProps> = ({ text, variant = 'primary', size = 'medium', disabled = false }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;