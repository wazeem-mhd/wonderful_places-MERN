import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/AuthSlice";
import postreducer from "./features/PostSlice";

export const store = configureStore({
  reducer: {
    User: userReducer,
    Posts: postreducer,
  },
});
