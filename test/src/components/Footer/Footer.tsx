import React from 'react';
import styles from './Footer.module.css';
import Logo from '../common/Logo/Logo';
import Navigation from '../common/Navigation/Navigation';


// Определение типа для пропсов компонента
interface FooterProps {
  title: string;
  subtitle?: string; // Опциональный проп
}
  

const Footer: React.FC<FooterProps> = ({ title, subtitle }) => {
  return (
    <footer className={styles.footer}>
      <Logo />
      <Navigation />
      <div className={styles.div}></div>
    </footer>
  );
};

export default Footer;