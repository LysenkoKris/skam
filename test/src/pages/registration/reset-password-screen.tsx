import ResetPasswordForm from '../../components/reset-password-form/reset-password-form'
import LogoAuth from '../../components/common/LogoAuth/LogoAuth'
import './styles.css';

export default function ResetPasswordScreen() {
	return (
		<main className='Registration'>
			<LogoAuth />
			<ResetPasswordForm />
		</main>
	);
}
