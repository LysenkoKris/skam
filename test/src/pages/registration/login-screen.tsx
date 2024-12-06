import EntranceForm from '../../components/entrance-form/entrance-form'
import Logo from '../../components/common/Logo/Logo'
import './styles.css';

interface LoginScreenProps {
	onLogin: (email: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
	return (
		<main className='Registration'>
			<Logo />
			<EntranceForm onLogin={onLogin} />
		</main>
	);
}
