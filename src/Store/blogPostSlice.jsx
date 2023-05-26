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
