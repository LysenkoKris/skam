import styles from './Header.module.css';
import Logo from '../common/Logo/Logo';
import Navigation from '../common/Navigation/Navigation';
import AuthButtons from './AuthButtons';
import Profile from './profile';
import { AuthorizationStatus } from '../../const';

interface HeaderProps {
  email: string | null;
  authorizationStatus: AuthorizationStatus;
  onLogout: () => void;
}

export default function Header({
  email,
  authorizationStatus,
  onLogout,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      {authorizationStatus === AuthorizationStatus.Auth && email ? (
        <Profile email={email} onLogout={onLogout} />
      ) : (
        <AuthButtons />
      )}
    </header>
  );
}
