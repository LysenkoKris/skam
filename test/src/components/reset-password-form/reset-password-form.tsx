import { useState } from 'react';
import { AppRoute } from '../../const'; 
import { useNavigate } from 'react-router-dom';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import styles from './resetPasswordForm.module.css';

export default function ResetPasswordForm() {
  const [email, setUsername] = useState('');
  const navigate = useNavigate();

  const ResetPassword = () => {
    console.log('Email пользователя:', email);
    navigate(AppRoute.Login);
  };

  return (
    <div className={styles.resetPasswordForm}>
      <h1 className={styles.title}>Сброс пароля</h1>
      <TextField
          label="Адрес электронной почты:"
          type="email"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
      />
      <div className={styles.Button}>
        <Button  text="Отправить" onClick={ResetPassword} variant="primary" />
      </div>
    </div>
  );
}
