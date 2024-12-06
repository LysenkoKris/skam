import RegisterForm from '../../components/register-form/register-form'
import Logo from '../../components/common/Logo/Logo'
import './styles.css';

interface RegisterScreenProps {
	onLogin: (email: string) => void;
}

export default function RegisterScreen({ onLogin }: RegisterScreenProps) {
	return (
		<main className='Registration'>
			<Logo />
			<RegisterForm onLogin={onLogin} />
		</main>
	);
}
