import React from 'react';
import { useDispatch } from 'react-redux';
import useField from '../hooks/useField';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authenticationSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const {
    reset: resetUsername,
    onChange: setUsername,
    value: username,
  } = useField('text');
  const {
    reset: resetPassword,
    onChange: setPassword,
    value: password,
  } = useField('password');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn } = useSelector((store) => store.authenticationSlice);
  if (loggedIn) navigate('/index');

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(
      login({
        username,
        password,
      })
    );

    resetUsername();
    resetPassword();

    navigate('/index');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          name="username"
          onChange={(e) => setUsername(e)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default Login;
