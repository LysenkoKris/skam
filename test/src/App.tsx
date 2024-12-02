import React from 'react';
import MainScreen from './main-screen';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header title="My React App" subtitle="Welcome to the best app ever!" />
      <MainScreen />
    </div>
  );
}

export default App;
