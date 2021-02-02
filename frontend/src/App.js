import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Views/Login/login'

function App() {
  const { auth } = useSelector(state => state)
  return (
    <>
    {!auth.loggedIn ? <Login /> : <></>}
    </>
  );
}

export default App;
