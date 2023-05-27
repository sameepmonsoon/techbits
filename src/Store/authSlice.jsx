import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpCalls } from "../utils/HttpCalls";

const initialState = {
  isLoading: false,
  error: "",
  token: "",
  success: "",
  currentUserDetail: [],
  isAuthenticated: false,
};

export const signUp = createAsyncThunk("signup", async (body) => {
  try {
    const result = await HttpCalls.post("/auth/signup", body);
    console.log("response ", result.data);
    login({})
    return result.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
});

export const login = createAsyncThunk("login", async (body) => {
  try {
    const result = await HttpCalls.post("/auth/signin", body);
    console.log("response ", result);
    return result.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.error };
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoading = false;
      state.error = "";
      state.success = "";
    },
    logout: (state) => {
      state.currentUserDetail = "";
      state.isAuthenticated = false;
      localStorage.removeItem("localToken");
      localStorage.removeItem("user");
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.error) {
          state.error = action.payload.error;
          console.log(state.error);
        } else {
          localStorage.setItem("localToken", action.payload.token);
          state.token = action.payload.token;
          state.success = action.payload.message;
          state.error = "";
        }
      })
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.error) {
          state.error = action.payload.error;
        } else {
          localStorage.setItem("localToken", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.token = action.payload.token;
          state.currentUserDetail = action.payload;
          state.isAuthenticated = true;
          console.log(state.currentUserDetail);
          state.success = action.payload.message;
        }
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload
          ? action.payload.error
          : "An error occurred.";
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
