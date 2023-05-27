import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import blogPostReducer from "./blogPostSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogPostReducer,
  },
});
