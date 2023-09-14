import { configureStore } from "@reduxjs/toolkit";
import tableRenderReducer from "./renderTableSlice";
import authReducer from "./authSlice";
import optionsReducer from "./optionsSlice";
import getUserReducer  from "./user/getUserSlice";
import updateUserReducer from "./user/editUserSlice"
const store = configureStore({
  reducer: {
    tableRender: tableRenderReducer,
    auth: authReducer,
    options: optionsReducer,
    getUser: getUserReducer,
    editUser:updateUserReducer
  },
});

export default store;
