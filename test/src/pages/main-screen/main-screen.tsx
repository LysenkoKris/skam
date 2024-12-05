import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import Example from '../../components/Example/Example';
import Header from '../../components/Header/Header';

export default function MainScreen(): JSX.Element {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [domains, setDomains] = useState('');

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleDomainsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDomains(event.target.value);
	};

	return (
		<div>
			<Header title="My React App" subtitle="Welcome to the best app ever!" />
			<main className="Page">
				<h1>Hello world!!</h1>
				<Button text="Button" />
				<Button text="Button" variant="secondary" />
				<Button text="Button" variant="delete" size="small" />
				<Button text="Button" size="large" />
				<Button text="Button" size="small" />
				<Button text="Button" disabled />
				<Example />
				<form className="Form">
					<TextField
						label="Имя пользователя:"
						value={username}
						onChange={handleUsernameChange}
						placeholder=""
					/>
					<TextField
						label="Адрес электронной почты:"
						value={email}
						onChange={handleEmailChange}
						type="email"
						placeholder="Введите почту"
					/>
					<TextField
						label="Пароль:"
						value={password}
						onChange={handlePasswordChange}
						type="password"
						placeholder=""
					/>
					<TextArea
						label="Хотите добавить свои?"
						value={domains}
						onChange={handleDomainsChange}
						placeholder="Если хотите ввести несколько поддоменов, то пречисляйте их с новой строки"
						rows={5}
					/>
				</form>

			</main>
		</div>
	);
}
