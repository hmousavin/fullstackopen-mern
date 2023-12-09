import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Notification from './Notification';
import Index from './Index';
import { useSelector } from 'react-redux';

function App() {
  const { loggedIn } = useSelector((store) => store.authenticationSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn === false) navigate('/login');
  }, []);

  return (
    <div>
      <Notification />
      <Outlet />
      {loggedIn === true ? <Index /> : ''}
    </div>
  );
}

export default App;
