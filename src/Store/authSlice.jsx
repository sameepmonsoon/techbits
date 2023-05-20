import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: false, error: false, token: "" };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {},
  },
});

export default authSlice.reducer;
