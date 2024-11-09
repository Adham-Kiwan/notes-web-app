// App.js
import React from 'react';
import Login from './Login';
import Signup from './Signup';
import useStore from './store';

function App() {
  const { isLogin } = useStore();

  return (
    <>
      {isLogin ? <Login /> : <Signup />}
    </>
  );
}

export default App;