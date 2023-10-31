// Slice 파일
import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./thunk";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: null,
    loading: "",
    loggedIn: false,
    error: null,
  },
  reducers: {
    userLogout: (state) => {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
        state.loggedIn = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
        state.loggedIn = false;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      });
  },
});
export const { userLogout } = dataSlice.actions;
export default dataSlice.reducer;
