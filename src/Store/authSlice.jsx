import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpCalls } from "../utils/HttpCalls";

const initialState = {
  isLoading: false,
  error: "",
  token: "",
  success: "",
  showToast: false,
  currentUserDetail: [],
  isAuthenticated: false,
  logoutState: false,
};

export const signUp = createAsyncThunk("signup", async (body) => {
  try {
    const result = await HttpCalls.post("/auth/signup", body);

    return result.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
});

export const login = createAsyncThunk("login", async (body) => {
  try {
    const result = await HttpCalls.post("/auth/signin", body);
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
      state.logoutState = true;
      state.isAuthenticated = false;
      localStorage.removeItem("localToken");
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.error) {
          state.error = action.payload.error;
        } else {
          localStorage.setItem("localToken", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload));
          localStorage.setItem("isAuthenticated", true);
          state.token = action.payload.token;
          state.success = action.payload.message;
          state.error = "";
          state.isAuthenticated = true;
        }
      })
      .addCase(signUp.pending, (state) => {
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
          localStorage.setItem("isAuthenticated", true);
          state.token = action.payload.token;
          state.currentUserDetail = action.payload;
          state.isAuthenticated = true;
          state.success = action.payload.message;
          state.showToast = true;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.error
          : "An error occurred.";
      });
  },
});

export const { clearState, logout } = authSlice.actions;
export default authSlice.reducer;
