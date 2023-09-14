import { createSlice, createAsyncThunk,unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_BASE_URL;

export const updateUser = createAsyncThunk("users/updateUser", async (arr,{ getState }) => {
    const response = await axios.patch(`${apiBaseUrl}/users/${arr[0]}`, arr[1], {
      headers: {
        Authorization: `Bearer ${arr[2]}`,
      },
    });
    return response.data;
  });

  const updateUserSlice = createSlice({
    name: "updateUser",
    initialState: {
        check: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      
        .addCase(updateUser.pending, (state) => {
          state.loading = true;
          state.check = null;
          state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
  
          state.check = true;
          state.error = null;
          state.loading = false;

        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
  

        })
  
    },
  });
  
  export default updateUserSlice.reducer;