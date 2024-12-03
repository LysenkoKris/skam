import React from 'react';
import styles from './TextField.module.css';

// Определение типа для пропсов компонента
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email'; // Дополнительный проп для типа поля ввода
  placeholder?: string; // Дополнительный проп для placeholder
  disabled?: boolean; // Дополнительный проп для состояния disabled
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, type = 'text', placeholder = '', disabled = false }) => {
  return (
    <div className={styles.textField}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default TextField;