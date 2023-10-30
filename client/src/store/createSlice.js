// Slice 파일
import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./thunk";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: null,
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })

      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      });
  },
});

export default dataSlice.reducer;
