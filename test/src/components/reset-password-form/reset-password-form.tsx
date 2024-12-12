import { useState } from 'react';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import styles from './resetPasswordForm.module.css';

export default function ResetPasswordForm() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const validateEmail = (email: string): boolean => {
		if (!email.includes('@') || email.split('@')[1].trim() === '') {
			setError('Неверный формат email. Убедитесь, что email содержит "@"');
			return false;
		}
		setError(null);
		return true;
	};

	const handleResetPassword = () => {
		if (validateEmail(email)) {
			console.log('Email пользователя:', email);
			navigate(AppRoute.Login);
		}
	};

	return (
		<div className={styles.resetPasswordForm}>
			<h1 className={styles.title}>Сброс пароля</h1>
			<TextField
				label="Адрес электронной почты:"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			{error && <p className={styles.error}>{error}</p>}
			<div className={styles.Button}>
				<Button text="Отправить" onClick={handleResetPassword} variant="primary" />
			</div>
		</div>
	);
}