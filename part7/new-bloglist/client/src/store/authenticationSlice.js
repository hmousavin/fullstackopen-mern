import { createSlice } from '@reduxjs/toolkit';
import { showError, showInfo } from './notificationSlice';
import authenticationService from '../services/authenticationService';

export const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    login(currentSlice, action) {
      //   const { userId } = action.payload;
      //   const user = currentSlice.find((u) => u.user === userId);
      //   if (user !== undefined) user.state = 'logined';
      //   else
      //     currentSlice = currentSlice.concat({ user: userId, state: 'logined' });
      currentSlice.loggedIn = true;
    },
    logout(currentSlice, action) {
      //   const { userId } = action.payload;
      //   const user = currentSlice.find((u) => u.user === userId);
      //   if (user !== undefined) user.state = 'logged-out';
      //   else
      //     currentSlice = currentSlice.concat({
      //       user: userId,
      //       state: 'logged-out',
      //     });
      currentSlice.loggedIn = false;
    },
  },
});

export const authenticationReducer = authenticationSlice.reducer;

export const login = (credentials) => {
  return (dispatch) => {
    const { username, password } = credentials;

    try {
      const user = authenticationService.login({ username, password });
      const { login } = authenticationSlice.actions;

      dispatch(login(user.id));
      dispatch(showInfo(`welcome ${user.name}!`));
    } catch (error) {
      dispatch(showError(`${username} authentication failed`));
    }
  };
};

export const logout = (user) => {
  const { logout } = authenticationSlice.actions;

  return (dispatch) => {
    dispatch(logout(user.id));
    dispatch(showInfo(`see you later ${user.name}`));
  };
};
