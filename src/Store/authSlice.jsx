import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpCalls } from "../utils/HttpCalls";

const initialState = { isLoading: false, error: "", token: "" };

// const fetch2 = async (api, body, token = "") => {
//   console.log("inside fetch2", body);
//   const res = await HttpCalls.post(api, body);
//   console.log("response ", res);

//   return res.data;
// };
export const signUp = createAsyncThunk("signup", async (body) => {
  try {
    console.log("inside redux", body);
    const result = await HttpCalls.post("/auth/signup", body);
    console.log("response ", result.data);
    return result.data;
  } catch (error) {
    console.log("error", error.response.data.error);
    return { error: error.response.data.error };
  }
});

export const login = createAsyncThunk("login", async (body) => {
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

      if (action.payload && action.payload.error) {
        state.error = action.payload.error;
        console.log(state.error);
      } else {
        state.token = action.payload;
        state.error = "";
      }
    },
    [signUp.pending]: (state, action) => {
      state.isLoading = true;
      state.error = "";
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload && action.payload.error) {
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
