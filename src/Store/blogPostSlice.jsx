import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpCalls } from "../utils/HttpCalls";

const initialState = {
  isLoading: false,
  error: "",
  token: "",
  success: "",
  currentBlogPosts: [],
  isAuthenticated: false,
};
export const fetchAllBlogs = createAsyncThunk("fetchBlogs", async () => {
  try {
    const result = await HttpCalls.get("/blogPost/getAll");
    return result.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.error };
  }
});
const blogPostSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.error) {
          state.error = action.payload.error;
        } else {
          localStorage.setItem("localToken", action.payload.token);
          localStorage.setItem(
            "currentBlogPosts",
            JSON.stringify(action.payload?.getAllBlog)
          );
          state.token = action.payload.token;
          state.currentBlogPosts = action.payload?.getAllBlog;
          state.isAuthenticated = true;
          console.log(state.currentBlogPosts);
          state.success = action.payload.message;
        }
      })
      .addCase(fetchAllBlogs.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload
          ? action.payload.error
          : "An error occurred.";
      });
  },
});

// export const { clearState } = authSlice.actions;
export default blogPostSlice.reducer;
