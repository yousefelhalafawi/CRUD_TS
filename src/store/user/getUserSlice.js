import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_BASE_URL;

export const fetchUser = createAsyncThunk("users/fetchUser", async (arr) => {
  const response = await axios.get(`${apiBaseUrl}/users/${arr[0]}`, {
    headers: {
      Authorization: `Bearer ${arr[1]}`,
    },
  });
  return response.data;
});

export const createUser = createAsyncThunk("users/createUser", async (arr) => {
  const response = await axios.patch(`${apiBaseUrl}/users/`, arr[0], {
    headers: {
      Authorization: `Bearer ${arr[1]}`,
    },
  });
  return response.data;
});
export const updateUser = createAsyncThunk("users/updateUser", async (arr) => {
  const response = await axios.patch(`${apiBaseUrl}/users/${arr[0]}`, arr[1], {
    headers: {
      Authorization: `Bearer ${arr[2]}`,
    },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (arr) => {
  const response = await axios.delete(`${apiBaseUrl}/users/${arr[0]}`, {
    headers: {
      Authorization: `Bearer ${arr[1]}`,
    },
  });
  return response.data;
});

const getUserSlice = createSlice({
  name: "getUser",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload.result.data;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getUserSlice.reducer;
