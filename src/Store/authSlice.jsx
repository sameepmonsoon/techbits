import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpCalls } from "../utils/HttpCalls";

const initialState = { isLoading: false, error: "false", token: "" };

const fetch2 = async (api, body, token = "") => {
  const res = await HttpCalls.post(api, body);
  return res.data;
};
export const signUp = createAsyncThunk("signup", async () => {
  const result = await fetch2("/signup", body);
  return result;
});
export const login = createAsyncThunk("login", async (userData) => {
  const result = await HttpCalls.get("login", body);
  return result.data;
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {},
  },
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.token = action.payload.token;
      }
    },
    [signUp.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.token = action.payload.token;
      }
    },
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default authSlice.reducer;
