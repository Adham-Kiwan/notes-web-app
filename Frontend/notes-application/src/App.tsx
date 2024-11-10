// App.js
import React from 'react';
import Login from './Login';
import Signup from './Signup';
import MainPage from './MainPage';
import useStore from './store';
import './App.css';

function App() {
  const { isLogin, isLoggedIn } = useStore();

  if (isLoggedIn) {
    return <MainPage />;
  }

  return isLogin ? <Login /> : <Signup />;
}

export default App;
