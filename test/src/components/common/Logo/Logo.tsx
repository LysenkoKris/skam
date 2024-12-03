import React from 'react';
import logo from '../../../assets/logo-default.svg';
import styles from './Logo.module.css';

const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img src={logo} alt="Logo" />
      </a>
    </div>
  );
};

export default Logo;