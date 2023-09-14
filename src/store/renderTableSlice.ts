import { createSlice } from '@reduxjs/toolkit';

interface NavigationState {
  render: boolean;
}

const initialState: NavigationState = {
  render: true,
};

const tableRenderSlice = createSlice({
  name: 'tableRender',
  initialState,
  reducers: {
    toggleRender: (state) => {
      state.render = !state.render;
    },
   
  },
});

export const { toggleRender} = tableRenderSlice.actions;
export default tableRenderSlice.reducer;
