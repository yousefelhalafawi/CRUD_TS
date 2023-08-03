import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  accessCode: localStorage.getItem('accessCode') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setAccessCode: (state, action) => {
      state.accessCode = action.payload;
      localStorage.setItem('accessCode', action.payload);
    },
    clear: (state) => {
      state.token = null;
      state.accessCode = null;
      localStorage.removeItem('token');
      localStorage.removeItem('accessCode');

    },
  },
});

export const { setToken, clear ,setAccessCode} = authSlice.actions;
export default authSlice.reducer;
