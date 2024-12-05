import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const'; 
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import styles from './entranceForm.module.css';

export default function EntranceForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEntrance = () => {
    console.log('Имя пользователя:', username);
    console.log('Пароль:', password);
    navigate(AppRoute.Root);
  };

  return (
    <div className={styles.entranceForm}>
      <h1 className={styles.title}>Вход</h1>
      <div className={styles.textFields}>
        <TextField
            label="Имя пользователя:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя пользователя"
        />
        <TextField
            label="Пароль:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
