import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/useSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
