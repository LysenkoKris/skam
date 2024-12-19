import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Header from '../../components/Header/Header';
import { AuthorizationStatus } from '../../const';
import styles from './comparison-screen.module.css';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import ComparisonCard from '../../components/ComparisonCard/ComparisonCard';
import Footer from '../../components/Footer/Footer';

interface ComparisonScreenProps {
	authorizationStatus: AuthorizationStatus;
	email: string | null;
	onLogout: () => void;
}

export default function ComparisonScreen({
	authorizationStatus,
	email,
	onLogout,
}: ComparisonScreenProps): JSX.Element {
	const breadcrumbItems = [
		{ label: 'Главная', link: '/' },
		{ label: 'Сравнение сайтов' },
	];

	const [onelink, setOneLink] = useState('');
	const [twolink, setTwoLink] = useState('');
	const [comparisonMessage, setComparisonMessage] = useState('');
	const [similarity, setSimilarity] = useState(0);
	const [showShortComparison, setShowShortComparison] = useState(false);
	const [showLongComparison, setShowLongComparison] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [linkStatus, setLinkStatus] = useState('');

	const handleOneLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOneLink(event.target.value);
	};

	const handleTwoLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTwoLink(event.target.value);
	};

	const handleCheckClick = () => {
		if (!onelink || !twolink) {
			setErrorMessage('Пожалуйста, заполните оба поля ссылок.');
			return;
		}

		if (!isValidUrl(onelink) || !isValidUrl(twolink)) {
			setErrorMessage('Пожалуйста, введите корректные URL-адреса.');
			return;
		}

		setErrorMessage('');
		setComparisonMessage(`Сравнение сайтов ${onelink} и ${twolink}`);
		// Значение сходства получаться будет с бека
		const calculatedSimilarity = Math.floor(Math.random() * 100); // Пока случайное значение
		setSimilarity(calculatedSimilarity);
		setLinkStatus(getLinkStatus(calculatedSimilarity));
		setShowShortComparison(true);
	};

	const handleGetDetailedReportClick = () => {
		setShowLongComparison(true);
	};

	const getColorBySimilarity = (similarity: number): string => {
		if (similarity >= 0 && similarity < 25) {
			return '#1DCD8D';
		} else if (similarity >= 25 && similarity < 50) {
			return '#FFE139';
		} else if (similarity >= 50 && similarity < 75) {
			return '#FFA339';
		} else {
			return '#FF3939';
		}
	};

	const isValidUrl = (url: string): boolean => {
		try {
			new URL(url);
			return true;
		} catch (error) {
			return false;
		}
	};

	// пока таким образом определяется, какой же сайт, потом нужно будет получать с бека сообщение
	const getLinkStatus = (similarity: number): string => {
		if (similarity >= 90) {
			return 'опасно - копия сайта';
		} else if (similarity >= 70) {
			return 'другой домен сайта заказчика';
		} else if (similarity >= 50) {
			return 'Разные сайты';
		} else {
			return 'Невозможно установить статус';
		}
	};

	return (
		<div className='Container'>
			<Header
				authorizationStatus={authorizationStatus}
				email={email}
				onLogout={onLogout}
			/>
			<div className="Page">
				<Breadcrumbs items={breadcrumbItems} />
				<div className={styles.comparisonPage}>
					<div className={styles.comparisonInputs}>
						<div className={styles.comparisonHead}>
							<h2>Проверка сайта на подлинность</h2>
							<h4>
								<span>На этой странице вы можете проверить сайт на подлинность путем сравнения сайтов.</span>
								<span>Необходимо ввести две ссылки, и сервис выведет отчет в виде таблицы о схожести контента и url адреса.</span>
							</h4>
						</div>
						<form className={styles.comparisonLinks}>
							<TextField
								label="Первая ссылка:"
								value={onelink}
								onChange={handleOneLinkChange}
								placeholder="Например, https://telegram.org"
							/>
							<TextField
								label="Вторая ссылка:"
								value={twolink}
								onChange={handleTwoLinkChange}
								placeholder="Например, https://telegram.org"
							/>
						</form>
						{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
						<Button text="Проверить" size="large" onClick={handleCheckClick} />
					</div>
					{showShortComparison && (
						<div className={styles.comparisonShort}>
							<div className={styles.comparisonText}>
								<p className={styles.comparisonMessage}>{comparisonMessage}</p>
								<p className={styles.comparisonMessage}>Сайт {twolink} - <span style={{ fontWeight: 500 }}>{linkStatus}</span></p>
								<p style={{ fontSize: 22, margin: 0 }}>
									Сходство <span style={{ color: getColorBySimilarity(similarity), fontWeight: 600 }}>{similarity}</span>%
								</p>
							</div>
							<div className={styles.comparisonCards}>
								<ComparisonCard title="Домены" text="97%" />
								<ComparisonCard title="HTML" text="97%" />
								<ComparisonCard title="Текст" text="97%" />
								<ComparisonCard title="Скриншоты" text="97%" />
								<ComparisonCard title="VirusTotal" text="97%" />
							</div>
							<Button text="Получить подробный отчет" size="large" onClick={handleGetDetailedReportClick} />
						</div>
					)}
					{showLongComparison && (
						<div className={styles.comparisonLong}>
							<h2>В приложении производится сравнение по 9 основным критериям:</h2>
							ТУТ БУДЕТ ТАБЛИЦА
						</div>
					)}
				</div>
			</div>
			<Footer title="My React App" subtitle="Welcome to the best app ever!" />
		</div>
	);
}
