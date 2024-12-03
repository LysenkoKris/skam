import React from 'react';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><a href="/comparison">Сравнение сайтов</a></li>
        <li><a href="/monitoring">Мониторинг доменов</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;