import EntranceForm from '../../components/entrance-form/entrance-form'
import LogoAuth from '../../components/common/LogoAuth/LogoAuth'
import './styles.css';

interface LoginScreenProps {
	onLogin: (email: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
	return (
		<main className='Registration'>
			<LogoAuth />
			<EntranceForm onLogin={onLogin} />
		</main>
	);
}
