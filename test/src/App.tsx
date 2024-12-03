import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './main-screen';
import ComparisonScreen from './comparison-screen';
import Header from './components/Header/Header';
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header title="My React App" subtitle="Welcome to the best app ever!" />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/comparison" element={<ComparisonScreen />} />
        </Routes>
        <Footer title="My React App" subtitle="Welcome to the best app ever!" />
      </div>
    </Router>
  );
}

export default App;