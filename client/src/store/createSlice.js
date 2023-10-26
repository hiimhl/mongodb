import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: "",
  },
  reducers: {
    hi: (state) => {
      state.value = "hi";
    },
    bye: (state) => {
      state.value = "bye";
    },
  },
});

// 리듀서는 export해서 app/index.js에 import해야됨.

export const { plus, minus } = dataSlice.actions;
export default dataSlice.reducer;
