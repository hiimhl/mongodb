import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { dataSlice } from "./createSlice";

import logger from "redux-logger";

const store = configureStore({
  reducer: dataSlice,
  //middleware: [...getDefaultMiddleware()],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
