import { configureStore } from '@reduxjs/toolkit';
import tableRenderReducer from './renderTableSlice';
import authReducer from './authSlice'
import optionsReducer from './optionsSlice';

const store = configureStore({
  reducer: {
    tableRender: tableRenderReducer,
    auth: authReducer,
    options:optionsReducer,

  },
});

export default store;
