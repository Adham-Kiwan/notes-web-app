// App.js
import React from 'react';
import Login from './Login';
import Signup from './Signup';
import useStore from './store';
import MainPage from './MainPage';
import './App.css'; // Import your CSS file here


function App() {
  const { isLogin } = useStore();

  return (
    <>
      {/* {isLogin ? <Login /> : <Signup />} */}
      <MainPage />
    </>
  );
}

export default App;