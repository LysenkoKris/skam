import React, { useState } from 'react';
import styles from './InputNumber.module.css';
import up from '../../assets/Up.svg';
import down from '../../assets/Down.svg';

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const InputNumber: React.FC<InputNumberProps> = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setInputValue(clampedValue);
    onChange(clampedValue);
  };

  const handleIncrement = () => {
    if (inputValue >= max) return;
    const newValue = Math.min(inputValue + step, max);
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleDecrement = () => {
    if (inputValue <= min) return;
    const newValue = Math.max(inputValue - step, min);
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.inputNumberContainer}>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        className={styles.inputNumber}
      />
      <div className={styles.buttonsContainer}>
        <button onClick={handleIncrement} className={`${styles.buttonUp} ${inputValue >= max ? styles.disabled : ''}`} disabled={inputValue >= max}>
          <img src={up} alt="up" />
        </button>
        <button onClick={handleDecrement} className={`${styles.buttonDown} ${inputValue <= min ? styles.disabled : ''}`} disabled={inputValue <= min}>
          <img src={down} alt="down" />
        </button>
      </div>
    </div>
  );
};

export default InputNumber;