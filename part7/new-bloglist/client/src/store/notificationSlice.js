import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    caption: '',
    type: '',
  },
  reducers: {
    showInfo(currentSlice, action) {
      currentSlice.caption = action.payload;
      currentSlice.type = 'info';
    },
    showError(currentSlice, action) {
      currentSlice.caption = action.payload;
      currentSlice.type = 'error';
    },
    reset(currentSlice, action) {
      currentSlice.caption = '';
      currentSlice.type = '';
    },
  },
});

export const notificationReducer = notificationSlice.reducer;

export const showInfo = (info) => {
  const { showInfo, reset } = notificationSlice.actions;

  return (dispatch) => {
    dispatch(showInfo(info));
    setTimeout(() => {
      dispatch(reset());
    }, 2500);
  };
};

export const showError = (error) => {
  const { showError, reset } = notificationSlice.actions;

  return (dispatch) => {
    dispatch(showError(error));
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  };
};
