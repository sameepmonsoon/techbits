import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpCalls } from "../utils/HttpCalls";

const initialState = {
  isLoading: true,
  error: "",
  token: "",
  success: "",
  currentBlogPosts: [],
  isFetched: false,
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
        if (action.payload && action.payload.error) {
          state.error = action.payload.error;
        } else {
          localStorage.setItem("localToken", action.payload.token);
          localStorage.setItem(
            "currentBlogPosts",
            JSON.stringify(action?.payload?.getAllBlog)
          );
          state.isLoading = false;
          state.token = action.payload.token;
          state.currentBlogPosts = action.payload?.getAllBlog;
          state.isFetched = true;
          state.success = action.payload.message;
          localStorage.setItem("isUpdated", true);
        }
      })
      .addCase(fetchAllBlogs.pending, (state) => {
        state.error = "";
        state.success = "";
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isFetched = false;
        state.error = action.payload
          ? action.payload.error
          : "An error occurred.";
      });
  },
});

// export const { clearState } = authSlice.actions;
export default blogPostSlice.reducer;
