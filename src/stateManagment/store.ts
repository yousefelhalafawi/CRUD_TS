import { configureStore } from '@reduxjs/toolkit';
import tableRenderReducer from './renderTableSlice';
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    tableRender: tableRenderReducer,
    auth: authReducer,

  },
});

export default store;
