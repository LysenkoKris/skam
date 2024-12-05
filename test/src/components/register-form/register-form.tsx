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

export default function RegisterForm() {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    console.log('Имя пользователя:', formState.username);
    console.log('Email:', formState.email);
    console.log('Пароль:', formState.password);
    console.log('Подтверждение пароля:', formState.repassword);
    navigate(AppRoute.Root);
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
          <p className={styles.prompt}>Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/,/+/-/_.</p>
        </div>
        <TextField
          label="Email:"
          type="email"
          value={formState.email}
          onChange={handleChange('email')}
          placeholder="Введите email"
        />
        <TextField
          label="Пароль:"
          type="password"
          value={formState.password}
          onChange={handleChange('password')}
          placeholder="Введите пароль"
        />
        <TextField
          label="Подтверждение пароля:"
          type="password"
          value={formState.repassword}
          onChange={handleChange('repassword')}
          placeholder="Введите пароль ещё раз"
        />
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
