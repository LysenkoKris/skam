import React from 'react';
import styles from './Header.module.css';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from './AuthButtons';


// Определение типа для пропсов компонента
interface HeaderProps {
  title: string;
  subtitle?: string; // Опциональный проп
}
  

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      <AuthButtons />
    </header>
  );
};

export default Header;