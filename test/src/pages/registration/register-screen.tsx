import RegisterForm from '../../components/register-form/register-form'
import Logo from '../../components/common/Logo/Logo'
import './styles.css';

export default function RegisterScreen() {
    return (
        <main className='Page'>
            <Logo />
            <RegisterForm />
        </main>
    );
}