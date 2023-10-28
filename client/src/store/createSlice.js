// Slice 파일
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: "",
  },
  reducers: {
    // hi: (state) => {
    //   state.value = "hi";
    // },
    userLogin: (submitData) => {
      const request = axios
        .post("/api/users/login", submitData)
        .then((res) => console.log(res.data));
    },
    userJoin: (submitData) => {
      const request = axios
        .post("/api/users/register", submitData)
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
    },
  },
});

// 리듀서는 export해서 app/index.js에 import해야됨.

export const { userLogin, userJoin } = dataSlice.actions;
export default dataSlice.reducer;
