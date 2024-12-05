// src/components/Button/Button.tsx

import React from 'react';
import styles from './Button.module.css';

// Определение типа для пропсов компонента
interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'delete'; // Дополнительный проп для варианта кнопки
  size?: 'small' | 'medium' | 'large'; // Дополнительный проп для размера кнопки
  disabled?: boolean; // Дополнительный проп для состояния disabled
  onClick?: () => void; // Добавляем пропс onClick
}

const Button: React.FC<ButtonProps> = ({ text, variant = 'primary', size = 'medium', disabled = false, onClick }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;