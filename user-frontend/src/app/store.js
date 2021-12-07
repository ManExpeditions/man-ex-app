import { configureStore } from "@reduxjs/toolkit";
import emailRegisterSlice from "../slices/auth/emailRegisterSlice";

export const store = configureStore({
  reducer: {
    emailRegisterSlice: emailRegisterSlice,
  },
});
