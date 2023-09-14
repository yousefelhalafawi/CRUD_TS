import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userOptions: sessionStorage.getItem('userOptions') || null,
  projectOptions: sessionStorage.getItem('projectOptions') || null,
  departmentOptions: sessionStorage.getItem('departmentOptions') || null,
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
      state.projectOptions = action.payload;
      sessionStorage.setItem('projectOptions', action.payload);
    },
    setDepartmentsOptions: (state, action) => {
      state.departmentOptions = action.payload;
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
