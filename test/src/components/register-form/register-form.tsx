import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import styles from './registerForm.module.css';

interface FormState {
	username: string;
	email: string;
	password: string;
	repassword: string;
}

interface RegisterFormProps {
	onLogin: (email: string) => void;
}

export default function RegisterForm({ onLogin }: RegisterFormProps) {
	const [formState, setFormState] = useState<FormState>({
		username: '',
		email: '',
		password: '',
		repassword: '',
	});

	const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

	const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
		setFormState((prevState) => ({
			...prevState,
			[field]: e.target.value,
		}));
	};

	const navigate = useNavigate();

	const validateForm = (): boolean => {
		const newErrors: { username?: string; email?: string; password?: string } = {};

		const usernameRegex = /^[а-яА-Яa-zA-Z0-9@,+\-_]{1,150}$/;
		if (!usernameRegex.test(formState.username)) {
			newErrors.username = 'Имя пользователя может содержать только буквы, цифры и символы @/,/+/-/_. (до 150 символов)';
		}

		if (formState.password !== formState.repassword) {
			newErrors.password = 'Введенные пароли не совпадают.';
		}

		if (!formState.email.includes('@') || formState.email.split('@')[1].trim() === '') {
			newErrors.email = 'Неверный формат email. Убедитесь, что email содержит "@"';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleRegister = () => {
		if (validateForm()) {
			console.log('Имя пользователя:', formState.username);
			console.log('Email:', formState.email);
			console.log('Пароль:', formState.password);
			console.log('Подтверждение пароля:', formState.repassword);
			onLogin(formState.email);
			navigate(AppRoute.Root);
		}
	};

	return (
		<div className={styles.registerForm}>
			<h1 className={styles.title}>Регистрация</h1>
			<div className={styles.textFields}>
				<div className={styles.userName}>
					<TextField
						label="Имя пользователя:"
						value={formState.username}
						onChange={handleChange('username')}
						placeholder="Введите имя пользователя"
					/>
					<p className={errors.username ? styles.error : styles.prompt}>
						Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/,/+/-/_.
					</p>
				</div>
				<div>
					<TextField
						label="Email:"
						type="email"
						value={formState.email}
						onChange={handleChange('email')}
						placeholder="Введите email"
					/>
					{errors.email && <p className={styles.error}>{errors.email}</p>}
				</div>
				<TextField
					label="Пароль:"
					type="password"
					value={formState.password}
					onChange={handleChange('password')}
					placeholder="Введите пароль"
				/>
				<div>
					<TextField
						label="Подтверждение пароля:"
						type="password"
						value={formState.repassword}
						onChange={handleChange('repassword')}
						placeholder="Введите пароль ещё раз"
					/>
					{errors.password ? 
						<p className={styles.error}>{errors.password}</p> : 
						<p className={styles.prompt}> Для подтверждения введите, пожалуйста, пароль ещё раз.</p>}
				</div>
			</div>
			<div className={styles.actionsElements}>
				<Button text="Зарегистрироваться" onClick={handleRegister} variant="primary" />
				<Link to={AppRoute.Login} className={styles.link}>
					Уже есть аккаунт?
				</Link>
			</div>
		</div>
	);
}
