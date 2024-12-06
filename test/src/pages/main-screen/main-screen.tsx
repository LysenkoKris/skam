import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import Example from '../../components/Example/Example';
import Header from '../../components/Header/Header';
import InputNumber from '../../components/InputNumber/InputNumber';
import FileDownloader from '../../components/FileDownloader/FileDownloader';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

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

	const [value, setValue] = useState(3);

	const handleChange = (newValue: number) => {
		setValue(newValue);
	};

	const files = [
		{ value: '/files/2-12-2024.xlsx', label: 'Проверка 2.12.2024' },
		{ value: '/files/20-11-2024.xlsx', label: 'Проверка 20.11.2024' },
		{ value: '/files/4-11-2024.xlsx', label: 'Проверка 4.11.2024' },
	];

	const [progress, setProgress] = useState(0);

	const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProgress(Number(event.target.value));
	  };

	return (
		<div>
			<Header title="My React App" subtitle="Welcome to the best app ever!" />
			<main className="Page">
				<h1>Hello world!!</h1>
				<InputNumber value={value} onChange={handleChange} min={3} max={20} step={1} />
				<FileDownloader files={files} />
				<ProgressBar value={progress} max={100} />
				<input
					type="range"
					min="0"
					max="100"
					value={progress}
					onChange={handleProgressChange}
					style={{ width: '100%', marginTop: '20px' }}
				/>
				<Button text="Button" />
				<Button text="Button" variant="secondary" />
				<Button text="Button" variant="delete" size="small" />
				<Button text="Button" size="large" />
				<Button text="Button" size="small" />
				<Button text="Button" disabled />
				<Button text="Link Button" variant="link"  onClick={() => alert('Link Button Clicked')} />
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
