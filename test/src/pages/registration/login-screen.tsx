import EntranceForm from '../../components/entrance-form/entrance-form'
import Logo from '../../components/common/Logo/Logo'
import './styles.css';

export default function LoginScreen() {
    return (
        <main className='Page'>
            <Logo />
            <EntranceForm />
        </main>
    );
}