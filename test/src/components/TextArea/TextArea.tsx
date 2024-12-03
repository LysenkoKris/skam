import React from 'react';
import styles from './TextArea.module.css';

// Определение типа для пропсов компонента
interface TextAreaProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string; // Дополнительный проп для placeholder
  disabled?: boolean; // Дополнительный проп для состояния disabled
  rows?: number; // Дополнительный проп для количества строк
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, placeholder = '', disabled = false, rows = 4 }) => {
  return (
    <div className={styles.textArea}>
      <label className={styles.label}>{label}</label>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;