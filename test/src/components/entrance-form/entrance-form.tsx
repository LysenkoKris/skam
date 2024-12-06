import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const'; 
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import styles from './entranceForm.module.css';


interface EntranceFormProps {
  onLogin: (email: string) => void;
}

interface FormState {
  username: string;
  password: string;
}

export default function EntranceForm({ onLogin }: EntranceFormProps) {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
  });

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleEntrance = () => {
    console.log('Имя пользователя:', formState.username);
    console.log('Пароль:', formState.password);
    onLogin(formState.username);
    navigate(AppRoute.Root);
  };

  return (
    <div className={styles.entranceForm}>
      <h1 className={styles.title}>Вход</h1>
      <div className={styles.textFields}>
        <TextField
            label="Имя пользователя:"
            value={formState.username}
            onChange={handleChange('username')}
            placeholder="Введите имя пользователя"
        />
        <TextField
            label="Пароль:"
            type="password"
            value={formState.password}
            onChange={handleChange('password')}
            placeholder="Введите пароль"
        />
      </div>
      
      
      <Button  text="Войти" onClick={handleEntrance} variant="primary" />
      <div className={styles.links}>
        <Link to={AppRoute.Register} className={styles.link}>
          Зарегистрироваться
        </Link>
        <Link to={AppRoute.ResetPassword} className={styles.link}>
          Забыли пароль?
        </Link>
      </div>
    </div>
  );
}
