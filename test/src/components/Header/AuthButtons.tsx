import React from 'react';
import styles from './Header.module.css';

const AuthButtons: React.FC = () => {
  return (
    <div className={styles.actions}>
      <a href="/login" className={styles.button}>Вход</a>
      <p>|</p>
      <a href="/register" className={styles.button}>Регистрация</a>
    </div>
  );
};

export default AuthButtons;