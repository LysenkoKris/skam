import RegisterForm from '../../components/register-form/register-form'
import LogoAuth from '../../components/common/LogoAuth/LogoAuth'
import './styles.css';

interface RegisterScreenProps {
	onLogin: (email: string) => void;
}

export default function RegisterScreen({ onLogin }: RegisterScreenProps) {
	return (
		<main className='Registration'>
			<LogoAuth />
			<RegisterForm onLogin={onLogin} />
		</main>
	);
}
