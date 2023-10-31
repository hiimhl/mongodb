import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 비동기 액션을 작성.
export const userLogin = createAsyncThunk(
  "data/userLogin",
  async (req, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/login", req);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const userRegister = createAsyncThunk(
  "data/userRegister",
  async (req, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/register", req);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const userAuth = createAsyncThunk(
  "data/userData",
  async (req, thunkAPI) => {
    try {
      const response = await axios.get("/api/users/auth");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
