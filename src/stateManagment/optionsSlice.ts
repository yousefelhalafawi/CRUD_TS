import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userOptions: localStorage.getItem('userOptions') || null,
  projectOptions: localStorage.getItem('projectOptions') || null,
  departmentOptions: localStorage.getItem('departmentOptions') || null,
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setUserOptions: (state, action) => {
      state.userOptions = action.payload;
      sessionStorage.setItem('userOptions', action.payload);
    },
    setProjectOptions: (state, action) => {
      state.userOptions = action.payload;
      sessionStorage.setItem('projectOptions', action.payload);
    },
    setDepartmentsOptions: (state, action) => {
      state.userOptions = action.payload;
      sessionStorage.setItem('departmentOptions', action.payload);
    },



    clearOptions: (state) => {
      state.userOptions = null;
      state.projectOptions = null;
      sessionStorage.removeItem('userOptions');
      sessionStorage.removeItem('projectOptions');
      sessionStorage.removeItem('departmentOptions');

    },
  },
});

export const { setUserOptions,setProjectOptions, setDepartmentsOptions,clearOptions } = optionsSlice.actions;
export default optionsSlice.reducer;
