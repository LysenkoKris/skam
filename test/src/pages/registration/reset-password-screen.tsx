import ResetPasswordForm from '../../components/reset-password-form/reset-password-form'
import Logo from '../../components/common/Logo/Logo'
import './styles.css';

export default function ResetPasswordScreen() {
	return (
		<main className='Registration'>
			<Logo />
			<ResetPasswordForm />
		</main>
	);
}
