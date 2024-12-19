import React from 'react';
import logo from '../../../assets/logo-default.svg';
import styles from './LogoAuth.module.css';

const LogoAuth: React.FC = () => {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img src={logo} alt="LogoAuth" />
      </a>
    </div>
  );
};

export default LogoAuth;