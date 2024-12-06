import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const'
import MainScreen from './pages/main-screen/main-screen';
import ComparisonScreen from './pages/comparison-screen/comparison-screen';
import LoginScreen from './pages/registration/login-screen';
import RegisterScreen from './pages/registration/register-screen';
import ResetPasswordScreen from './pages/registration/reset-password-screen';
import Header from './components/Header/Header';
import './App.css';

function App() {

	const [authorizationStatus, setAuthorizationStatus] = useState<AuthorizationStatus>(
    AuthorizationStatus.NoAuth
  );
  const [email, setEmail] = useState<string | null>(null);

  const handleLogin = (userEmail: string) => {
    setAuthorizationStatus(AuthorizationStatus.Auth);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    setAuthorizationStatus(AuthorizationStatus.NoAuth);
    setEmail(null);
  };

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route 
						path={AppRoute.Root} 
						element={
							<MainScreen 
								authorizationStatus={authorizationStatus}
                email={email}
                onLogout={handleLogout}
							/>
						} 
					/>
					<Route path={AppRoute.Comparison} element={<ComparisonScreen />} />
					<Route path={AppRoute.Login} element={<LoginScreen onLogin={handleLogin}/>} />
					<Route path={AppRoute.Register} element={<RegisterScreen/>} />
					<Route path={AppRoute.ResetPassword} element={<ResetPasswordScreen />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
