import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoute } from './const'
import MainScreen from './pages/main-screen/main-screen';
import ComparisonScreen from './pages/comparison-screen/comparison-screen';
import LoginScreen from './pages/registration/login-screen';
import RegisterScreen from './pages/registration/register-screen';
import ResetPasswordScreen from './pages/registration/reset-password-screen';
import Header from './components/Header/Header';
import './App.css';
import Footer from './components/Footer/Footer';

function App() {

	return (
		<Router>
			<div className="App">
				{/* <Header title="My React App" subtitle="Welcome to the best app ever!" /> */}
				<Routes>
					<Route path={AppRoute.Root} element={<MainScreen />} />
					<Route path={AppRoute.Comparison} element={<ComparisonScreen />} />
					<Route path={AppRoute.Login} element={<LoginScreen />} />
					<Route path={AppRoute.Register} element={<RegisterScreen />} />
					<Route path={AppRoute.ResetPassword} element={<ResetPasswordScreen />} />
				</Routes>
				{/* <Footer title="My React App" subtitle="Welcome to the best app ever!" /> */}
			</div>
		</Router>
	);
}

export default App;
