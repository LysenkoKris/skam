import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { AuthorizationStatus } from '../../const';
import InputNumber from '../../components/InputNumber/InputNumber';
import FileDownloader from '../../components/FileDownloader/FileDownloader';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import KebabMenu from '../../components/KebabMenu/KebabMenu';

interface MainScreenProps {
	authorizationStatus: AuthorizationStatus;
	email: string | null;
	onLogout: () => void;
}

export default function MainScreen({
	authorizationStatus,
	email,
	onLogout,
}: MainScreenProps): JSX.Element {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [domains, setDomains] = useState('');

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
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

	const handleEdit = () => {
		alert('Редактировать');
	  };
	
	  const handleDelete = () => {
		alert('Удалить');
	  };

	return (
		<div>
			<Header
				authorizationStatus={authorizationStatus}
				email={email}
				onLogout={onLogout}
			/>
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
				<Button text="Link Button" variant="link" onClick={() => alert('Link Button Clicked')} />
				<form className="Form">
					<TextField
						label="Имя пользователя:"
						value={username}
						onChange={handleUsernameChange}
						placeholder=""
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
			<Footer title="My React App" subtitle="Welcome to the best app ever!" />
		</div>

	);
}



