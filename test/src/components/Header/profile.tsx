import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const'

interface ProfileProps {
	email: string;
	onLogout: () => void;
}

export default function Profile({ email, onLogout }: ProfileProps) {
	return (
		<div className={styles.profile}>
			<span>{email}</span>
			<Link to={AppRoute.Root} className={styles.button} onClick={onLogout}>
				Выход
			</Link>
		</div>
	);
}
